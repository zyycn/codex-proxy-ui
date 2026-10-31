import type { DirectiveBinding, ObjectDirective } from 'vue'
import type { LoadingBinding } from './types'
import en from '../../locale/lang/en'

interface LoadingState {
  overlay: HTMLDivElement
  label: HTMLSpanElement
  previousPosition: string | null
  previousBusy: string | null
  hadOverflowHidden: boolean
}

const states = new WeakMap<HTMLElement, LoadingState>()
const OVERLAY_CLASS = 'absolute inset-0 z-50 grid place-items-center rounded-[inherit]'
const MASK_CLASS = 'bg-z-bg-container/82 backdrop-blur-xs'
const PANEL_CLASS = 'inline-flex min-h-10 items-center gap-2.5 rounded-xl py-2.25 pr-3.5 pl-3 text-xs leading-[1.15] font-heavy text-z-text-secondary'
const MARK_CLASS = 'inline-block size-4 rounded-full motion-safe:animate-spin bg-[radial-gradient(circle_at_center,var(--z-color-bg-container)_0_44%,transparent_46%),conic-gradient(from_0deg,var(--z-color-primary)_0deg_105deg,var(--z-color-primary-hover)_105deg_200deg,var(--z-color-fill-tertiary)_200deg_360deg)]'

function hideLoading(element: HTMLElement) {
  const state = states.get(element)
  if (!state)
    return

  state.overlay.remove()
  if (state.previousBusy === null)
    element.removeAttribute('aria-busy')
  else
    element.setAttribute('aria-busy', state.previousBusy)
  if (!state.hadOverflowHidden)
    element.classList.remove('overflow-hidden')
  if (state.previousPosition !== null)
    element.style.position = state.previousPosition
  states.delete(element)
}

function createLoading(element: HTMLElement): LoadingState {
  const overlay = document.createElement('div')
  overlay.setAttribute('role', 'status')
  overlay.setAttribute('aria-live', 'polite')

  const panel = document.createElement('div')
  panel.className = PANEL_CLASS
  const mark = document.createElement('span')
  mark.className = MARK_CLASS
  mark.setAttribute('aria-hidden', 'true')
  const label = document.createElement('span')
  label.className = 'whitespace-nowrap'
  panel.append(mark, label)
  overlay.append(panel)

  const state = {
    overlay,
    label,
    previousPosition: getComputedStyle(element).position === 'static' ? element.style.position : null,
    previousBusy: element.getAttribute('aria-busy'),
    hadOverflowHidden: element.classList.contains('overflow-hidden'),
  }
  states.set(element, state)
  return state
}

function syncLoading(element: HTMLElement, { value }: DirectiveBinding<LoadingBinding>) {
  const options = typeof value === 'object' && value !== null ? value : { loading: value }
  if (!options.loading) {
    hideLoading(element)
    return
  }

  const state = states.get(element) ?? createLoading(element)
  if (state.previousPosition !== null)
    element.style.position = 'relative'
  element.classList.add('overflow-hidden')
  element.setAttribute('aria-busy', 'true')
  state.label.textContent = options.text ?? en.common.loading
  state.overlay.className = options.preserveContent ? OVERLAY_CLASS : `${OVERLAY_CLASS} ${MASK_CLASS}`
  // Vue 更新纯文本子节点时会移除蒙层，复用原节点补回容器。
  if (state.overlay.parentElement !== element)
    element.append(state.overlay)
}

export const loading: ObjectDirective<HTMLElement, LoadingBinding> = {
  mounted: syncLoading,
  updated: syncLoading,
  beforeUnmount: hideLoading,
}

declare module 'vue' {
  interface GlobalDirectives {
    vLoading: typeof loading
  }
}
