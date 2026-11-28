import type { AppContext, Component, MaybeRefOrGetter, VNode } from 'vue'
import type { UiLocale } from '../../locale/types'

export type NotificationType = '' | 'primary' | 'success' | 'error' | 'warning' | 'info'
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export interface NotificationProgress {
  color?: string | { color: string, percentage: number }[] | ((percentage: number) => string)
  strokeWidth?: number
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit'
  status?: '' | 'success' | 'warning' | 'exception'
  striped?: boolean
  stripedFlow?: boolean
  showText?: boolean
  textInside?: boolean
  format?: (percentage: number) => string
}

export interface NotificationOptions {
  message?: string | VNode | (() => VNode)
  type?: NotificationType
  title?: string
  duration?: number
  deduplicate?: boolean
  position?: NotificationPosition
  offset?: number
  zIndex?: number
  appendTo?: HTMLElement | string
  customClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>
  icon?: string | Component
  closeIcon?: string | Component
  showClose?: boolean
  pauseOnHover?: boolean
  progress?: boolean | NotificationProgress
  dangerouslyUseHTMLString?: boolean
  onClick?: () => void
  onClose?: (notification: VNode) => void
}

export interface NotificationHandle {
  close: () => void
}

export type NotificationParams = NotificationOptions | string | VNode
type Notify = (options?: NotificationParams, context?: AppContext | null) => NotificationHandle

export interface NotificationService extends Notify {
  primary: Notify
  success: Notify
  error: Notify
  warning: Notify
  info: Notify
  closeAll: () => void
  updateOffsets: (position?: NotificationPosition) => void
}

export interface NotificationConfig {
  locale?: MaybeRefOrGetter<UiLocale>
}
