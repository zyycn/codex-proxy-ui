<script setup lang="ts">
import type { MaybeRefOrGetter } from 'vue'
import type { UiLocale } from '../../../locale/types'
import type { NotificationMessage } from '../types'
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from '@lucide/vue'
import { provide, toValue, useTemplateRef } from 'vue'
import { localeKey, useLocale } from '../../../locale/context'
import IconButton from '../../icon-button/IconButton.vue'

const props = defineProps<{ messages: NotificationMessage[], locale?: MaybeRefOrGetter<UiLocale> }>()
const emit = defineEmits<{ close: [id: string], empty: [] }>()
const locale = useLocale(() => toValue(props.locale))
provide(localeKey, locale)
const root = useTemplateRef<HTMLElement>('root')

function finishLeave() {
  // 等全部退场节点移除后再释放容器，避免截断其他通知的关闭动画
  if (!props.messages.length && !root.value?.querySelector('article'))
    emit('empty')
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorClasses = {
  success: {
    iconBg: 'bg-z-success-container',
    icon: 'text-z-success',
  },
  error: {
    iconBg: 'bg-z-error-container',
    icon: 'text-z-error',
  },
  warning: {
    iconBg: 'bg-z-warning-container',
    icon: 'text-z-warning',
  },
  info: {
    iconBg: 'bg-z-info-container',
    icon: 'text-z-info',
  },
}
</script>

<template>
  <div ref="root" class="pointer-events-none fixed inset-x-3 top-3 z-9999 flex flex-col items-end gap-3 sm:inset-x-auto sm:top-6 sm:right-6">
    <TransitionGroup name="z-notification" tag="div" class="flex flex-col gap-3" appear @after-leave="finishLeave">
      <article
        v-for="message in messages"
        :id="message.id"
        :key="message.id"
        class="pointer-events-auto flex min-h-16 w-90 max-w-[calc(100vw-1.5rem)] items-center gap-3 rounded-z-card bg-z-bg-elevated px-3.5 py-3 shadow-z"
        :role="message.type === 'error' ? 'alert' : 'status'"
        aria-atomic="true"
      >
        <div
          class="flex size-8.5 shrink-0 items-center justify-center rounded-z"
          :class="colorClasses[message.type].iconBg"
        >
          <component
            :is="iconMap[message.type]"
            :size="18"
            :class="colorClasses[message.type].icon"
          />
        </div>

        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <p class="m-0 truncate text-z leading-[1.15] font-bold text-z-text">
            {{ message.title ?? locale.notification[message.type] }}
          </p>
          <p
            class="m-0 max-h-8 overflow-hidden text-xs leading-tight font-semibold text-z-text-secondary"
          >
            {{ message.message }}
          </p>
        </div>

        <IconButton
          size="small"
          :aria-label="locale.notification.close(message.title ?? locale.notification[message.type])"
          @click="emit('close', message.id)"
        >
          <X :size="16" class="text-z-text-quaternary" />
        </IconButton>
      </article>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.z-notification-enter-active {
  animation: z-notification-in 0.3s ease-out;
}

.z-notification-leave-active {
  animation: z-notification-out 0.2s ease-in;
}

@media (prefers-reduced-motion: reduce) {
  .z-notification-enter-active,
  .z-notification-leave-active {
    animation: none;
  }
}

@keyframes z-notification-in {
  from {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes z-notification-out {
  from {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
  }
}
</style>
