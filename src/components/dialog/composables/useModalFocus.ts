import type { Ref } from 'vue'
import { onBeforeUnmount } from 'vue'
import { getModalFocusTarget, rememberModalFocus } from '../utils/dialogFocus'

const focusableSelector = 'a[href],button,input,select,textarea,[tabindex]'

function focusableElements(root: ParentNode): HTMLElement[] {
  const elements: HTMLElement[] = []
  for (const element of root.children) {
    if (element instanceof HTMLElement && (element.hidden || element.inert))
      continue
    if (element instanceof HTMLElement && element.matches(focusableSelector)
      && element.tabIndex >= 0 && !element.matches(':disabled')
      && element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden') {
      elements.push(element)
    }
    elements.push(...focusableElements(element.shadowRoot ?? element))
  }
  return elements
}

export function useModalFocus(panel: Readonly<Ref<HTMLElement | null>>, options: {
  isOpen: () => boolean
  onEscape: () => void | false
}) {
  let previouslyFocused: HTMLElement | null = null

  function rememberFocus() {
    previouslyFocused = getModalFocusTarget(document.activeElement)
  }

  function focusInitial() {
    if (!panel.value || !options.isOpen())
      return
    rememberModalFocus(panel.value, previouslyFocused, options.isOpen)
    const first = focusableElements(panel.value)[0]
    ;(first ?? panel.value).focus()
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented || !options.isOpen())
      return
    if (event.key === 'Escape') {
      if (options.onEscape() !== false) {
        event.preventDefault()
        event.stopPropagation()
      }
      return
    }
    if (event.key !== 'Tab' || !panel.value)
      return
    const focusable = focusableElements(panel.value)
    let active = document.activeElement
    while (active?.shadowRoot?.activeElement)
      active = active.shadowRoot.activeElement
    const first = focusable[0]
    const last = focusable.at(-1)
    if (!focusable.includes(active as HTMLElement)
      || (event.shiftKey ? active === first : active === last)) {
      event.preventDefault()
      const target = (event.shiftKey ? last : first) ?? panel.value
      target.focus()
    }
  }

  function restoreFocus() {
    // 连续打开其他弹窗时，退场不能抢走新窗口已取得的焦点
    const active = document.activeElement
    const focusStayedInModal = active === document.body || active === document.documentElement || panel.value?.contains(active)
    const target = getModalFocusTarget(previouslyFocused)
    if (focusStayedInModal && target?.isConnected)
      target.focus()
    previouslyFocused = null
  }

  onBeforeUnmount(restoreFocus)
  return { rememberFocus, focusInitial, handleKeydown, restoreFocus }
}
