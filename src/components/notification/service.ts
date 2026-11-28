import type { AppContext, ShallowRef, VNode } from 'vue'
import type { NotificationConfig, NotificationOptions, NotificationParams, NotificationPosition, NotificationService, NotificationType } from './types'
import { h, isVNode, render, shallowRef } from 'vue'
import NotificationItem from './components/NotificationItem.vue'

const gap = 16
let nextId = 0

interface Entry {
  target: HTMLElement
  position: NotificationPosition
  options: NotificationOptions
  offset: ShallowRef<number>
  container: HTMLElement
  close: () => void
}

function normalize(input: NotificationParams): NotificationOptions {
  return typeof input === 'string' || isVNode(input) ? { message: input } : input
}

export function createNotification(config: NotificationConfig = {}): NotificationService {
  const entries = new Set<Entry>()

  function updateOffsets(position: NotificationPosition = 'top-right') {
    const distances = new Map<HTMLElement, number>()
    for (const entry of entries) {
      if (entry.position !== position)
        continue
      const distance = distances.get(entry.target) ?? gap
      entry.offset.value = distance + (entry.options.offset ?? 0)
      const element = entry.container.firstElementChild as HTMLElement | null
      distances.set(entry.target, distance + (element?.offsetHeight ?? 0) + gap)
    }
  }

  function showNotification(input: NotificationParams = {}, context?: AppContext | null) {
    if (typeof document === 'undefined')
      return { close() {} }

    const options = normalize(input)
    const position = options.position ?? 'top-right'
    const target = (typeof options.appendTo === 'string' ? document.querySelector<HTMLElement>(options.appendTo) : options.appendTo) ?? document.body
    if (options.deduplicate) {
      for (const entry of entries) {
        if (entry.position === position && entry.target === target && (entry.options.type ?? 'info') === (options.type ?? 'info')
          && entry.options.message === options.message && entry.options.title === options.title) {
          return { close: entry.close }
        }
      }
    }

    const container = document.createElement('div')
    const visible = shallowRef(true)
    const offset = shallowRef(0)
    const entry: Entry = {
      target,
      position,
      container,
      options,
      offset,
      close() {
        if (!entries.delete(entry))
          return
        visible.value = false
        updateOffsets(position)
      },
    }
    const vnode: VNode = h(NotificationItem, {
      id: `z-notification-${++nextId}`,
      options,
      visible,
      offset,
      position,
      locale: config.locale,
      onDismiss: entry.close,
      onResize: () => updateOffsets(position),
      onLeaving: () => options.onClose?.(vnode),
      onDestroy: () => {
        render(null, container)
        container.remove()
      },
    })
    vnode.appContext = context ?? null
    entries.add(entry)
    updateOffsets(position)
    target.append(container)
    render(vnode, container)
    return { close: entry.close }
  }

  function typed(type: NotificationType) {
    return (input: NotificationParams = {}, context?: AppContext | null) => showNotification({ ...normalize(input), type }, context)
  }

  return Object.assign(showNotification, {
    primary: typed('primary'),
    success: typed('success'),
    error: typed('error'),
    warning: typed('warning'),
    info: typed('info'),
    closeAll() {
      for (const entry of entries)
        entry.close()
    },
    updateOffsets,
  })
}

export const notification = createNotification()
