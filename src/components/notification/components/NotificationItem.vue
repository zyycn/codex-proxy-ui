<script setup lang="ts">
import type { MaybeRefOrGetter, ShallowRef } from 'vue'
import type { UiLocale } from '../../../locale/types'
import type { NotificationOptions, NotificationPosition } from '../types'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from '@lucide/vue'
import { useElementHover, useEventListener, useFocusWithin, useIntervalFn, useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, provide, ref, toValue, useTemplateRef, watch } from 'vue'
import { localeKey, useLocale } from '../../../locale/context'
import IconButton from '../../icon-button/IconButton.vue'

const props = defineProps<{
  id: string
  options: NotificationOptions
  position: NotificationPosition
  offset: ShallowRef<number>
  visible: ShallowRef<boolean>
  locale?: MaybeRefOrGetter<UiLocale>
}>()
const emit = defineEmits<{ dismiss: [], resize: [], leaving: [], destroy: [] }>()
const locale = useLocale(() => toValue(props.locale))
provide(localeKey, locale)
const icons = { primary: Info, success: CheckCircle2, warning: AlertTriangle, error: AlertCircle, info: Info }
const tones = {
  primary: 'bg-z-primary-container text-z-primary',
  success: 'bg-z-success-container text-z-success',
  error: 'bg-z-error-container text-z-error',
  warning: 'bg-z-warning-container text-z-warning',
  info: 'bg-z-info-container text-z-info',
}
const type = computed(() => props.options.type ?? 'info')
const title = computed(() => props.options.title ?? (type.value && locale.value.notification[type.value === 'primary' ? 'info' : type.value]))
const icon = computed(() => props.options.icon ?? (type.value && icons[type.value]))
const style = computed(() => ({
  [props.position.startsWith('top') ? 'top' : 'bottom']: `${props.offset.value}px`,
  zIndex: props.options.zIndex ?? 9999,
}))
const root = useTemplateRef<HTMLElement>('root')
useResizeObserver(root, () => emit('resize'))

function MessageContent() {
  const message = props.options.message
  return typeof message === 'function' ? message() : message
}

const duration = props.options.duration ?? 4500
const progress = typeof props.options.progress === 'object' ? props.options.progress : {}
const showProgress = duration > 0 && !!props.options.progress
const percentage = ref(100)
const progressText = computed(() => progress.format?.(Math.ceil(percentage.value)) ?? `${Math.ceil(percentage.value)}%`)
const progressColor = computed(() => {
  const color = progress.color
  if (typeof color === 'function')
    return color(percentage.value)
  if (Array.isArray(color)) {
    const stops = [...color].sort((a, b) => a.percentage - b.percentage)
    return (stops.find(stop => percentage.value <= stop.percentage) ?? stops.at(-1))?.color
  }
  if (color)
    return color
  const status = progress.status === 'exception' ? 'error' : progress.status || type.value
  return `var(--z-color-${status || 'primary'})`
})

let remaining = duration
let startedAt = 0
let timer: number | undefined
const hovered = useElementHover(root)
const { focused } = useFocusWithin(root)
const holding = computed(() => props.options.pauseOnHover !== false && (hovered.value || focused.value))
const { pause, resume } = useIntervalFn(() => {
  percentage.value = Math.max(0, (remaining - (performance.now() - startedAt)) / duration * 100)
}, 100, { immediate: false })

function pauseTimer() {
  if (timer === undefined)
    return
  remaining = Math.max(0, remaining - (performance.now() - startedAt))
  window.clearTimeout(timer)
  timer = undefined
  pause()
}

function startTimer() {
  if (duration <= 0 || timer !== undefined || !props.visible.value)
    return
  startedAt = performance.now()
  timer = window.setTimeout(emit, remaining, 'dismiss')
  if (showProgress)
    resume()
}

watch(holding, (held) => {
  if (held)
    pauseTimer()
  else
    startTimer()
})

const action = useTemplateRef<HTMLElement>('action')
useEventListener(root, 'click', () => {
  if (props.visible.value)
    props.options.onClick?.()
})
useEventListener(action, 'keydown', (event) => {
  if (props.options.onClick && event.target === action.value && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    props.options.onClick()
  }
})

function beforeLeave() {
  pauseTimer()
  emit('leaving')
}
useEventListener(document, 'keydown', (event) => {
  if (!props.visible.value)
    return
  if (event.key === 'Escape')
    emit('dismiss')
  else if (event.key === 'Delete' || event.key === 'Backspace')
    pauseTimer()
  else if (!holding.value)
    startTimer()
})
onMounted(startTimer)
onBeforeUnmount(pauseTimer)
</script>

<template>
  <Transition name="z-notification" appear @before-leave="beforeLeave" @after-leave="emit('destroy')">
    <article
      v-show="visible.value"
      :id="id"
      ref="root"
      role="alert"
      aria-atomic="true"
      class="z-notice fixed flex w-90 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-z-card bg-z-bg-elevated px-3.5 py-3 shadow-z"
      :class="[position.endsWith('left') ? 'z-notice-left left-4' : 'right-4', options.customClass]"
      :style="style"
    >
      <div
        ref="action"
        class="flex min-w-0 flex-1 items-start gap-3"
        :role="options.onClick ? 'button' : undefined" :tabindex="options.onClick ? 0 : undefined"
      >
        <span v-if="icon" class="grid size-8.5 shrink-0 place-items-center rounded-z" :class="tones[type || 'info']">
          <component :is="icon" :size="18" aria-hidden="true" />
        </span>
        <div class="grid min-w-0 flex-1 gap-1 wrap-anywhere">
          <p v-if="title" class="m-0 text-z leading-[1.15] font-bold text-z-text">
            {{ title }}
          </p>
          <div v-if="options.message" class="text-xs leading-tight font-semibold whitespace-pre-line text-z-text-secondary">
            <!-- eslint-disable-next-line vue/no-v-html -- 仅由调用方显式开启，普通消息按文本渲染 -->
            <div v-if="options.dangerouslyUseHTMLString && typeof options.message === 'string'" v-html="options.message" />
            <MessageContent v-else />
          </div>
        </div>
      </div>
      <IconButton v-if="options.showClose !== false" size="small" :aria-label="locale.notification.close(title)" @click.stop="emit('dismiss')">
        <component :is="options.closeIcon ?? X" :size="16" class="text-z-text-quaternary" />
      </IconButton>
      <div v-if="showProgress" aria-hidden="true" class="absolute inset-x-0 bottom-0 flex items-center overflow-hidden rounded-b-[inherit]">
        <div class="relative flex-1 overflow-hidden" :style="{ height: `${progress.strokeWidth ?? 2}px` }">
          <div
            class="z-notice-progress h-full" :class="{ 'rounded-full': progress.strokeLinecap !== 'butt' && progress.strokeLinecap !== 'square', 'z-notice-striped': progress.striped, 'z-notice-flow': progress.striped && progress.stripedFlow }"
            :style="{ width: `${percentage}%`, backgroundColor: progressColor }"
          >
            <span v-if="progress.showText && progress.textInside" class="block text-right text-z-xs">{{ progressText }}</span>
          </div>
        </div>
        <span v-if="progress.showText && !progress.textInside" class="px-1 text-z-xs">{{ progressText }}</span>
      </div>
    </article>
  </Transition>
</template>

<style scoped>
.z-notice {
  transition:
    top 0.4s,
    bottom 0.3s,
    transform 0.3s,
    opacity 0.3s;
}

.z-notification-enter-from {
  transform: translateX(calc(100% + 1rem));
}

.z-notice-left.z-notification-enter-from {
  transform: translateX(calc(-100% - 1rem));
}

.z-notification-leave-to {
  opacity: 0;
}

.z-notice-progress {
  transition: width 0.1s linear;
}

.z-notice-striped {
  background-image: repeating-linear-gradient(45deg, transparent 0 4px, rgb(255 255 255 / 25%) 4px 8px);
  background-size: 24px 24px;
}

.z-notice-flow {
  animation: z-notice-stripes 1s linear infinite;
}

@keyframes z-notice-stripes {
  to {
    background-position: 24px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .z-notice,
  .z-notice-progress {
    transition: none;
  }

  .z-notice-flow {
    animation: none;
  }
}
</style>
