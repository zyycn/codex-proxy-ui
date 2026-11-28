import type { CSSProperties, Ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { clamp } from 'es-toolkit'
import { computed } from 'vue'

export const viewportPadding = 8
export const supportsAnchorPosition = typeof CSS !== 'undefined' && CSS.supports('top', 'anchor(bottom)')

export function fitFloatingPanel(
  anchor: DOMRect,
  anchorName: string,
  panel: { left: number, top: number, width: number, height: number },
) {
  const left = clamp(panel.left, viewportPadding, Math.max(viewportPadding, window.innerWidth - panel.width - viewportPadding))
  const top = clamp(panel.top, viewportPadding, Math.max(viewportPadding, window.innerHeight - panel.height - viewportPadding))
  // 将翻转和边界修正保留为锚点偏移；锚点卸载时沿用最后一次测量的位置。
  const style: CSSProperties = {
    positionAnchor: supportsAnchorPosition ? anchorName : undefined,
    positionVisibility: supportsAnchorPosition ? 'anchors-visible' : undefined,
    left: supportsAnchorPosition ? `calc(anchor(left, ${anchor.left}px) + ${left - anchor.left}px)` : `${left}px`,
    top: supportsAnchorPosition ? `calc(anchor(top, ${anchor.top}px) + ${top - anchor.top}px)` : `${top}px`,
    maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
  }
  return { left, top, style }
}

export function useFloatingPositionUpdates(
  open: Ref<boolean>,
  anchor: Ref<HTMLElement | null>,
  panel: Ref<HTMLElement | null>,
  update: () => void,
) {
  const viewport = computed(() => open.value && typeof window !== 'undefined' ? window : null)
  useEventListener(viewport, 'resize', update)
  useEventListener(viewport, 'scroll', update, { capture: true, passive: true })
  useResizeObserver([anchor, panel], update)
}
