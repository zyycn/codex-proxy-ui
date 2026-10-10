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

export interface NotificationMessage extends NotificationOptions {
  id: string
  type: NotificationType
}
