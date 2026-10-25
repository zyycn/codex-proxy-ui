<script setup lang="ts">
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from '@lucide/vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { useLocale } from '../../locale/context'

import IconButton from '../icon-button/IconButton.vue'
import Scrollbar from '../scrollbar/Scrollbar.vue'
import { useDialogDrag } from './composables/useDialogDrag'
import { useModalFocus } from './composables/useModalFocus'
import { lockBodyScroll, unlockBodyScroll } from './utils/bodyScrollLock'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    width?: string | number
    fullscreen?: boolean
    type?: DialogType
    showClose?: boolean
    closeOnClickModal?: boolean
    closeOnPressEscape?: boolean
    beforeClose?: () => boolean | void | Promise<boolean | void>
    draggable?: boolean
    role?: 'dialog' | 'alertdialog'
  }>(),
  {
    description: undefined,
    width: '36rem',
    type: 'default',
    showClose: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    draggable: true,
    role: 'dialog',
  },
)

const emit = defineEmits<{ open: [], opened: [], close: [], closed: [] }>()

defineSlots<{ default?: () => unknown, footer?: () => unknown, icon?: () => unknown, description?: () => unknown, header?: (props: { titleId: string, close: () => Promise<void> }) => unknown }>()

const locale = useLocale()

type DialogType = 'default' | 'info' | 'warning' | 'danger' | 'success'

const open = defineModel<boolean>({ default: false })
const rendered = shallowRef(false)
const panel = useTemplateRef<HTMLElement>('panel')
const titleId = useId()
const descriptionId = useId()
const { cancelDrag, constrainPosition, handlePointerDown, isDragging, resetPosition } = useDialogDrag(
  panel,
  () => props.draggable && !props.fullscreen,
)
const { rememberFocus, focusInitial, handleKeydown, restoreFocus } = useModalFocus(panel, {
  isOpen: () => open.value,
  onEscape: () => {
    if (!props.closeOnPressEscape)
      return false
    void closeDialog()
  },
})
let ownsScrollLock = false

// 内容分段可能在弹窗打开期间改变面板高度；拖拽偏移必须随尺寸重新约束到视口内。
useResizeObserver(panel, () => {
  if (open.value)
    constrainPosition()
})

const panelStyle = computed(() => ({ width: props.fullscreen ? '100%' : typeof props.width === 'number' ? `${props.width}px` : props.width, maxWidth: '100%' }))
const closing = shallowRef(false)
let closeRequest = 0

const iconMap = {
  default: Info,
  info: Info,
  warning: AlertTriangle,
  danger: AlertCircle,
  success: CheckCircle2,
}

const typeClasses: Record<DialogType, { iconBg: string, icon: string }> = {
  default: {
    iconBg: 'bg-cp-fill-quaternary',
    icon: 'text-cp-text-secondary',
  },
  info: {
    iconBg: 'bg-cp-info-container',
    icon: 'text-cp-info',
  },
  warning: {
    iconBg: 'bg-cp-warning-container',
    icon: 'text-cp-warning',
  },
  danger: {
    iconBg: 'bg-cp-error-container',
    icon: 'text-cp-error',
  },
  success: {
    iconBg: 'bg-cp-success-container',
    icon: 'text-cp-success',
  },
}

async function closeDialog() {
  if (closing.value || !open.value)
    return
  const request = ++closeRequest
  closing.value = true
  try {
    if (await props.beforeClose?.() !== false && request === closeRequest)
      open.value = false
  }
  finally {
    if (request === closeRequest)
      closing.value = false
  }
}

function finishLeave() {
  if (open.value || !rendered.value)
    return
  // 保留子组件到退场完成，避免 Teleport 内容先卸载导致面板收缩。
  rendered.value = false
  resetPosition()
  releaseScrollLock()
  restoreFocus()
  emit('closed')
}

function acquireScrollLock() {
  if (ownsScrollLock)
    return
  ownsScrollLock = true
  lockBodyScroll()
}

function releaseScrollLock() {
  if (!ownsScrollLock)
    return
  ownsScrollLock = false
  unlockBodyScroll()
}

watch(
  open,
  async (isOpen) => {
    closeRequest++
    closing.value = false
    if (isOpen) {
      if (!rendered.value) {
        rememberFocus()
      }
      emit('open')
      rendered.value = true
      acquireScrollLock()
      await nextTick()
      focusInitial()
      return
    }

    if (rendered.value)
      emit('close')
    cancelDrag()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  releaseScrollLock()
})
defineExpose({ focus: () => panel.value?.focus(), close: closeDialog })
</script>

<template>
  <Teleport to="body">
    <Transition
      name="cp-modal" persisted @after-leave="finishLeave"
      @after-enter="open && emit('opened')"
    >
      <div
        v-if="rendered"
        v-show="open"
        :inert="!open"
        class="fixed inset-0 z-50 grid grid-cols-1 place-items-center overflow-hidden p-3 sm:p-6"
        role="presentation"
        :class="fullscreen ? 'p-0!' : undefined"
        @keydown="handleKeydown"
      >
        <button
          type="button"
          tabindex="-1"
          :aria-label="locale.dialog.close"
          :disabled="!closeOnClickModal || closing"
          class="absolute inset-0 cursor-default border-0 bg-cp-bg-mask p-0"
          @click="closeDialog"
        />
        <section
          ref="panel"
          class="cp-modal-panel relative grid max-h-[calc(100dvh-1.5rem)] w-full min-w-0 overflow-hidden rounded-cp-card bg-cp-modal-bg shadow-cp sm:max-h-[calc(100dvh-3rem)]"
          :class="[
            fullscreen ? 'h-full max-h-none! rounded-none!' : undefined,
            $slots.default ? 'grid-rows-[auto_minmax(0,1fr)_auto]' : 'grid-rows-[auto_auto]',
            isDragging ? 'cp-modal-panel--dragging' : undefined,
          ]"
          :style="panelStyle"
          :role="role"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description || $slots.description ? descriptionId : undefined"
          tabindex="-1"
        >
          <header
            class="cp-modal-header relative grid shrink-0 gap-3 p-4 sm:gap-4 sm:p-6"
            :class="[
              type === 'default'
                ? 'grid-cols-[minmax(0,1fr)_28px]'
                : 'grid-cols-[auto_minmax(0,1fr)_28px]',
              description || $slots.description ? 'items-start' : 'items-center',
              draggable ? 'cp-modal-header--draggable' : undefined,
              $slots.default || $slots.footer ? 'pb-0 sm:pb-0' : undefined,
            ]"
            @pointerdown="handlePointerDown"
          >
            <span
              v-if="type !== 'default'"
              class="inline-flex size-11 items-center justify-center rounded-cp"
              :class="$slots.icon ? 'bg-cp-fill-quaternary' : typeClasses[type].iconBg"
            >
              <slot name="icon">
                <component :is="iconMap[type]" :size="18" :class="typeClasses[type].icon" />
              </slot>
            </span>
            <div class="min-w-0">
              <slot name="header" :title-id="titleId" :close="closeDialog">
                <h2 :id="titleId" class="m-0 text-lg leading-6 font-heavy text-cp-text">
                  {{ title }}
                </h2>
                <p
                  v-if="description || $slots.description"
                  :id="descriptionId"
                  class="mt-1 mb-0 text-cp leading-[1.45] font-semibold text-cp-text-secondary"
                >
                  <slot name="description">
                    {{ description }}
                  </slot>
                </p>
              </slot>
            </div>
            <IconButton
              v-if="showClose"
              class="absolute top-7 right-7 translate-x-1/2 -translate-y-1/2 sm:top-9 sm:right-9"
              :aria-label="locale.common.close"
              size="small"
              :disabled="closing"
              @click="closeDialog"
            >
              <X :size="16" />
            </IconButton>
          </header>
          <div v-if="$slots.default" class="min-h-0 overflow-hidden px-3.25 py-3.25 sm:px-5.25 sm:py-5.25">
            <Scrollbar
              class="h-full -mr-2 pr-2 sm:-mr-3 sm:pr-3"
            >
              <div class="p-0.75">
                <slot />
              </div>
            </Scrollbar>
          </div>
          <footer
            v-if="$slots.footer"
            class="flex shrink-0 flex-wrap justify-end gap-2 px-4 pb-4 sm:gap-3 sm:px-6 sm:pb-6"
            :class="!$slots.default ? 'pt-4 sm:pt-6' : undefined"
          >
            <slot name="footer" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.cp-modal-enter-active,
.cp-modal-leave-active {
  transition: opacity 180ms ease;
}

.cp-modal-enter-active .cp-modal-panel,
.cp-modal-leave-active .cp-modal-panel {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.cp-modal-enter-from,
.cp-modal-leave-to {
  opacity: 0;
}

.cp-modal-enter-from .cp-modal-panel {
  opacity: 0;
  transform: translate3d(0, 8px, 0) scale(0.985);
}

.cp-modal-leave-to .cp-modal-panel {
  opacity: 0;
  transform: translate3d(0, 4px, 0) scale(0.99);
}

.cp-modal-header--draggable {
  cursor: move;
  touch-action: none;
  user-select: none;
}

.cp-modal-panel--dragging .cp-modal-header {
  cursor: grabbing;
}

@media (prefers-reduced-motion: reduce) {
  .cp-modal-enter-active,
  .cp-modal-leave-active,
  .cp-modal-enter-active .cp-modal-panel,
  .cp-modal-leave-active .cp-modal-panel {
    transition: none;
  }
}
</style>
