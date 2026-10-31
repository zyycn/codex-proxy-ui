import type { MaybeRefOrGetter } from 'vue'
import type { UiLocale } from '../../locale/types'

export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationOptions {
  message: string
  type?: NotificationType
  title?: string
  duration?: number
  deduplicate?: boolean
}

export interface NotificationHandle {
  close: () => void
}

export interface NotificationService {
  (options: NotificationOptions): NotificationHandle
  success: (options: NotificationOptions) => NotificationHandle
  error: (options: NotificationOptions) => NotificationHandle
  warning: (options: NotificationOptions) => NotificationHandle
  info: (options: NotificationOptions) => NotificationHandle
  closeAll: () => void
}

export interface NotificationMessage extends NotificationOptions {
  id: string
  type: NotificationType
}

export interface NotificationConfig {
  locale?: MaybeRefOrGetter<UiLocale>
}
