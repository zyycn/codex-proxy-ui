interface ModalFocusOrigin {
  target: HTMLElement | null
  isOpen: () => boolean
}

const focusOrigins = new WeakMap<HTMLElement, ModalFocusOrigin>()

export function rememberModalFocus(panel: HTMLElement, target: HTMLElement | null, isOpen: () => boolean) {
  focusOrigins.set(panel, { target, isOpen })
}

export function getModalFocusTarget(element: Element | null): HTMLElement | null {
  let target = element instanceof HTMLElement ? element : null
  while (target) {
    const panel = target.closest<HTMLElement>('.cp-modal-panel')
    const origin = panel && focusOrigins.get(panel)
    if (!origin || (origin.isOpen() && panel?.isConnected))
      return target
    // 嵌套或连续弹窗可能仍引用已退场面板，沿焦点来源回到仍可操作的触发元素。
    target = origin.target
  }
  return null
}
