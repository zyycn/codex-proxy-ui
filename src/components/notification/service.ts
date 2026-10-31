import type { NotificationConfig, NotificationHandle, NotificationMessage, NotificationOptions, NotificationService } from './types'
import { h, render } from 'vue'
import NotificationList from './components/NotificationList.vue'

let nextId = 0

export function createNotification(config: NotificationConfig = {}): NotificationService {
  let messages: NotificationMessage[] = []
  const timers = new Map<string, ReturnType<typeof setTimeout>>()
  let container: HTMLElement | null = null

  function renderMessages() {
    if (!container) {
      container = document.createElement('div')
      document.body.append(container)
    }
    render(h(NotificationList, { messages, locale: config.locale, onClose: close, onEmpty: destroyContainer }), container)
  }

  function destroyContainer() {
    if (messages.length || !container)
      return

    const element = container
    container = null
    render(null, element)
    element.remove()
  }

  function close(id: string) {
    const timer = timers.get(id)
    if (timer !== undefined) {
      clearTimeout(timer)
      timers.delete(id)
    }
    messages = messages.filter(message => message.id !== id)
    if (container)
      renderMessages()
  }

  function closeAll() {
    for (const timer of timers.values())
      clearTimeout(timer)
    timers.clear()
    messages = []
    if (container)
      renderMessages()
  }

  function showNotification(options: NotificationOptions): NotificationHandle {
    if (typeof document === 'undefined')
      return { close() {} }

    const type = options.type ?? 'info'
    if (options.deduplicate) {
      const existing = messages.find(message => message.type === type && message.message === options.message && message.title === options.title)
      if (existing)
        return { close: () => close(existing.id) }
    }
    const id = `z-notification-${++nextId}`
    const duration = options.duration ?? 3000
    messages = [...messages, { ...options, type, id }]
    renderMessages()
    if (duration > 0)
      timers.set(id, setTimeout(close, duration, id))
    return { close: () => close(id) }
  }

  return Object.assign(showNotification, {
    success: (options: NotificationOptions): NotificationHandle => showNotification({ ...options, type: 'success' }),
    error: (options: NotificationOptions): NotificationHandle => showNotification({ ...options, type: 'error' }),
    warning: (options: NotificationOptions): NotificationHandle => showNotification({ ...options, type: 'warning' }),
    info: (options: NotificationOptions): NotificationHandle => showNotification({ ...options, type: 'info' }),
    closeAll,
  })
}

export const notification = createNotification()
