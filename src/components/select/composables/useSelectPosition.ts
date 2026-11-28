import type { CSSProperties, Ref } from 'vue'
import { ref, shallowRef } from 'vue'
import { fitFloatingPanel, supportsAnchorPosition, useFloatingPositionUpdates, viewportPadding } from '../../../shared/floating-position'

export interface SelectPositionElements {
  controlRef: Ref<HTMLElement | null>
  listboxRef: Ref<HTMLElement | null>
}

export function useSelectPosition(open: Ref<boolean>, selectId: string, elements: SelectPositionElements) {
  const { controlRef, listboxRef } = elements
  const popoverStyle = shallowRef<CSSProperties>({})
  const popoverMaxHeight = ref('244px')
  const popoverPlacement = ref<'top' | 'bottom'>('bottom')

  function updatePopoverPosition() {
    if (!open.value || !controlRef.value || !listboxRef.value)
      return

    const rect = controlRef.value.getBoundingClientRect()
    const gap = 6
    const menuHeight = Math.min(listboxRef.value.scrollHeight, 244)
    const belowSpace = window.innerHeight - rect.bottom - gap - viewportPadding
    const aboveSpace = rect.top - gap - viewportPadding
    const placeAbove = belowSpace < menuHeight && aboveSpace > belowSpace
    const availableHeight = Math.max(placeAbove ? aboveSpace : belowSpace, 0)
    const maxHeight = Math.min(menuHeight, availableHeight)
    const { style } = fitFloatingPanel(rect, `--${selectId}`, {
      left: rect.left,
      top: placeAbove ? rect.top - maxHeight - gap : rect.bottom + gap,
      width: rect.width,
      height: maxHeight,
    })
    popoverPlacement.value = placeAbove ? 'top' : 'bottom'
    popoverMaxHeight.value = `${maxHeight}px`
    popoverStyle.value = {
      ...style,
      width: supportsAnchorPosition ? `anchor-size(width, ${rect.width}px)` : `${rect.width}px`,
    }
  }

  useFloatingPositionUpdates(open, controlRef, listboxRef, updatePopoverPosition)

  return { popoverStyle, popoverMaxHeight, popoverPlacement, updatePopoverPosition }
}
