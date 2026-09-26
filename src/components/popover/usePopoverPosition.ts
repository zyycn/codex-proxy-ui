import type { CSSProperties, Ref } from 'vue'
import type { PopoverPlacement, PopoverSide } from './types'
import { useEventListener, useResizeObserver, whenever } from '@vueuse/core'
import { clamp } from 'es-toolkit'
import { computed, nextTick, shallowRef, watch } from 'vue'

interface PopoverPoint {
  left: number
  top: number
}

interface PopoverPosition {
  placement: PopoverPlacement
  point: PopoverPoint
}

export function usePopoverPosition(
  props: Readonly<{ placement: PopoverPlacement, offset: number, anchorElement: HTMLElement | null }>,
  open: Ref<boolean>,
  rootRef: Ref<HTMLElement | null>,
  popoverRef: Ref<HTMLElement | null>,
) {
  const popoverStyle = shallowRef<CSSProperties>({})
  const popoverArrowStyle = shallowRef<CSSProperties>({})
  const popoverPlacement = shallowRef<PopoverPlacement>(props.placement)
  const arrowEdge = computed(() => popoverArrowEdge(popoverPlacement.value))
  const viewportTarget = computed(() => (open.value && typeof window !== 'undefined' ? window : null))

  function updatePopoverPosition() {
    const anchorElement = props.anchorElement ?? rootRef.value
    if (!open.value || !anchorElement)
      return

    const viewportPadding = 8
    const triggerRect = anchorElement.getBoundingClientRect()
    const panelRect = popoverRef.value?.getBoundingClientRect()
    const panelWidth = panelRect?.width ?? 0
    const panelHeight = panelRect?.height ?? 0
    const maxLeft = Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding)
    const maxTop = Math.max(viewportPadding, window.innerHeight - panelHeight - viewportPadding)
    const position = choosePopoverPosition({
      placement: props.placement,
      triggerRect,
      panelWidth,
      panelHeight,
      offset: props.offset,
      viewportPadding,
    })
    popoverPlacement.value = position.placement
    const left = clamp(position.point.left, viewportPadding, maxLeft)
    const top = clamp(position.point.top, viewportPadding, maxTop)

    popoverStyle.value = {
      left: `${left}px`,
      top: `${top}px`,
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
    }
    popoverArrowStyle.value = popoverArrowPosition({
      placement: position.placement,
      triggerRect,
      panelWidth,
      panelHeight,
      left,
      top,
    })
  }

  whenever(open, async () => {
    await nextTick()
    updatePopoverPosition()
  })
  watch(
    () => props.anchorElement,
    async () => {
      if (!open.value)
        return
      await nextTick()
      updatePopoverPosition()
    },
  )

  useEventListener(viewportTarget, 'resize', updatePopoverPosition)
  useEventListener(viewportTarget, 'scroll', updatePopoverPosition, { capture: true, passive: true })
  useResizeObserver([rootRef, popoverRef], updatePopoverPosition)

  return { popoverStyle, popoverArrowStyle, arrowEdge, updatePopoverPosition }
}

function popoverArrowEdge(placement: PopoverPlacement): PopoverSide {
  const placementSide = placement.split('-')[0] as PopoverSide
  const oppositeSide: Record<PopoverSide, PopoverSide> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }

  return oppositeSide[placementSide]
}

function choosePopoverPosition(options: {
  placement: PopoverPlacement
  triggerRect: DOMRect
  panelWidth: number
  panelHeight: number
  offset: number
  viewportPadding: number
}): PopoverPosition {
  const placements = placementCandidates(options.placement)

  for (const placement of placements) {
    const point = popoverPoint(placement, options)
    if (isPointInViewport(point, options)) {
      return { placement, point }
    }
  }

  return {
    placement: options.placement,
    point: popoverPoint(options.placement, options),
  }
}

function placementCandidates(placement: PopoverPlacement): PopoverPlacement[] {
  const all: PopoverPlacement[] = [
    'bottom-end',
    'bottom-start',
    'bottom',
    'top-end',
    'top-start',
    'top',
    'right',
    'left',
  ]
  const opposite: Record<PopoverPlacement, PopoverPlacement> = {
    'top': 'bottom',
    'top-start': 'bottom-start',
    'top-end': 'bottom-end',
    'right': 'left',
    'bottom': 'top',
    'bottom-start': 'top-start',
    'bottom-end': 'top-end',
    'left': 'right',
  }

  return [
    placement,
    opposite[placement],
    ...all.filter(item => item !== placement && item !== opposite[placement]),
  ]
}

function popoverPoint(
  placement: PopoverPlacement,
  options: {
    triggerRect: DOMRect
    panelWidth: number
    panelHeight: number
    offset: number
  },
): PopoverPoint {
  const { triggerRect, panelWidth, panelHeight, offset } = options
  const centerLeft = triggerRect.left + triggerRect.width / 2 - panelWidth / 2
  const centerTop = triggerRect.top + triggerRect.height / 2 - panelHeight / 2

  const points: Record<PopoverPlacement, PopoverPoint> = {
    'top': { left: centerLeft, top: triggerRect.top - panelHeight - offset },
    'top-start': { left: triggerRect.left, top: triggerRect.top - panelHeight - offset },
    'top-end': {
      left: triggerRect.right - panelWidth,
      top: triggerRect.top - panelHeight - offset,
    },
    'right': { left: triggerRect.right + offset, top: centerTop },
    'bottom': { left: centerLeft, top: triggerRect.bottom + offset },
    'bottom-start': { left: triggerRect.left, top: triggerRect.bottom + offset },
    'bottom-end': { left: triggerRect.right - panelWidth, top: triggerRect.bottom + offset },
    'left': { left: triggerRect.left - panelWidth - offset, top: centerTop },
  }

  return points[placement]
}

function isPointInViewport(
  point: PopoverPoint,
  options: {
    panelWidth: number
    panelHeight: number
    viewportPadding: number
  },
) {
  const { panelWidth, panelHeight, viewportPadding } = options

  return (
    point.left >= viewportPadding
    && point.top >= viewportPadding
    && point.left + panelWidth <= window.innerWidth - viewportPadding
    && point.top + panelHeight <= window.innerHeight - viewportPadding
  )
}

function popoverArrowPosition(options: {
  placement: PopoverPlacement
  triggerRect: DOMRect
  panelWidth: number
  panelHeight: number
  left: number
  top: number
}): CSSProperties {
  const arrowSize = 8
  const arrowHalf = arrowSize / 2
  const arrowPadding = 12
  const { placement, triggerRect, panelWidth, panelHeight, left, top } = options
  const side = placement.split('-')[0]
  const centerX = triggerRect.left + triggerRect.width / 2 - left
  const centerY = triggerRect.top + triggerRect.height / 2 - top

  if (side === 'top' || side === 'bottom') {
    const arrowLeft = clamp(centerX - arrowHalf, arrowPadding, panelWidth - arrowPadding)

    return {
      left: `${arrowLeft}px`,
      top: side === 'bottom' ? `${-arrowHalf}px` : `${panelHeight - arrowHalf}px`,
    }
  }

  const arrowTop = clamp(centerY - arrowHalf, arrowPadding, panelHeight - arrowPadding)

  return {
    left: side === 'right' ? `${-arrowHalf}px` : `${panelWidth - arrowHalf}px`,
    top: `${arrowTop}px`,
  }
}
