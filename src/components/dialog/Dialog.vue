<script setup lang="ts">
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from '@lucide/vue'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, shallowRef, useId, useTemplateRef, watch } from 'vue'
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
    destroyOnClose?: boolean
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

defineSlots<{ default?: () => unknown, footer?: (props: { close: () => Promise<void> }) => unknown, icon?: () => unknown, description?: () => unknown, header?: (props: { titleId: string, close: () => Promise<void> }) => unknown }>()

const locale = useLocale()

type DialogType = 'default' | 'info' | 'warning' | 'danger' | 'success'

const open = defineModel<boolean>({ default: false })
const visible = shallowRef(false)
const rendered = shallowRef(false)
const panel = useTemplateRef<HTMLElement>('panel')
const titleId = useId()
const descriptionId = useId()
const { cancelDrag, constrainPosition, handlePointerDown, isDragging, resetPosition } = useDialogDrag(
  panel,
  () => props.draggable && !props.fullscreen,
)
const { rememberFocus, focusInitial, handleKeydown, restoreFocus } = useModalFocus(panel, {
  isOpen: () => visible.value,
  onEscape: () => {
    if (!props.closeOnPressEscape)
      return false
    void closeDialog()
  },
})
let ownsScrollLock = false
let entered = false

// 内容分段可能在弹窗打开期间改变面板高度；拖拽偏移必须随尺寸重新约束到视口内。
useResizeObserver(panel, () => {
  if (visible.value)
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
    iconBg: 'bg-z-fill-quaternary',
    icon: 'text-z-text-secondary',
  },
  info: {
    iconBg: 'bg-z-info-container',
    icon: 'text-z-info',
  },
  warning: {
    iconBg: 'bg-z-warning-container',
    icon: 'text-z-warning',
  },
  danger: {
    iconBg: 'bg-z-error-container',
    icon: 'text-z-error',
  },
  success: {
    iconBg: 'bg-z-success-container',
    icon: 'text-z-success',
  },
}

async function closeDialog() {
  if (closing.value || !visible.value)
    return
  const request = ++closeRequest
  closing.value = true
  try {
    if (props.beforeClose && await props.beforeClose() === false)
      return
    if (request === closeRequest)
      setVisible(false)
  }
  finally {
    if (request === closeRequest)
      closing.value = false
  }
}

function finishLeave() {
  if (visible.value || !ownsScrollLock)
    return
  entered = false
  resetPosition()
  releaseScrollLock()
  restoreFocus()
  emit('closed')
  if (open.value)
    open.value = false
  if (props.destroyOnClose)
    rendered.value = false
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

function setVisible(value: boolean) {
  if (value === visible.value)
    return

  visible.value = value
  if (value) {
    if (!ownsScrollLock)
      rememberFocus()
    rendered.value = true
    acquireScrollLock()
    emit('open')
    void nextTick(focusInitial)
  }
  else {
    cancelDrag()
    emit('close')
    // 同一轮渲染内打开又关闭时，Vue 不会启动过渡或派发 after-leave。
    if (!entered)
      finishLeave()
  }
}

// 初始模型也在挂载后生效，让按需创建的弹窗走相同的入场过渡。
onMounted(() => {
  watch(open, (value) => {
    closeRequest++
    closing.value = false
    setVisible(value)
  }, { immediate: true })
})

onBeforeUnmount(() => {
  closeRequest++
  releaseScrollLock()
})
defineExpose({ focus: () => panel.value?.focus(), close: closeDialog })
</script>

<template>
  <Teleport to="body">
    <Transition
      name="z-modal" persisted @before-enter="entered = true" @after-leave="finishLeave"
      @after-enter="visible && emit('opened')"
    >
      <div
        v-if="rendered"
        v-show="visible"
        :inert="!visible"
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
          class="absolute inset-0 cursor-default border-0 bg-z-bg-mask p-0"
          @click="closeDialog"
        />
        <section
          ref="panel"
          class="z-modal-panel relative grid max-h-[calc(100dvh-1.5rem)] w-full min-w-0 overflow-hidden rounded-z-card bg-z-modal-bg shadow-z sm:max-h-[calc(100dvh-3rem)]"
          :class="[
            fullscreen ? 'h-full max-h-none! rounded-none!' : undefined,
            $slots.default ? 'grid-rows-[auto_minmax(0,1fr)_auto]' : 'grid-rows-[auto_auto]',
            isDragging ? 'z-modal-panel--dragging' : undefined,
          ]"
          :style="panelStyle"
          :role="role"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="description || $slots.description ? descriptionId : undefined"
          tabindex="-1"
        >
          <header
            class="z-modal-header relative grid shrink-0 gap-3 p-4 sm:gap-4 sm:p-6"
            :class="[
              type === 'default'
                ? 'grid-cols-[minmax(0,1fr)_28px]'
                : 'grid-cols-[auto_minmax(0,1fr)_28px]',
              description || $slots.description ? 'items-start' : 'items-center',
              draggable ? 'z-modal-header--draggable' : undefined,
              $slots.default || $slots.footer ? 'pb-0 sm:pb-0' : undefined,
            ]"
            @pointerdown="handlePointerDown"
          >
            <span
              v-if="type !== 'default'"
              class="inline-flex size-11 items-center justify-center rounded-z"
              :class="$slots.icon ? 'bg-z-fill-quaternary' : typeClasses[type].iconBg"
            >
              <slot name="icon">
                <component :is="iconMap[type]" :size="18" :class="typeClasses[type].icon" />
              </slot>
            </span>
            <div class="min-w-0">
              <slot name="header" :title-id="titleId" :close="closeDialog">
                <h2 :id="titleId" class="m-0 text-lg leading-6 font-heavy text-z-text">
                  {{ title }}
                </h2>
                <p
                  v-if="description || $slots.description"
                  :id="descriptionId"
                  class="mt-1 mb-0 text-z leading-[1.45] font-semibold text-z-text-secondary"
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
            <slot name="footer" :close="closeDialog" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.z-modal-enter-active,
.z-modal-leave-active {
  transition: opacity 180ms ease;
}

.z-modal-enter-active .z-modal-panel,
.z-modal-leave-active .z-modal-panel {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.z-modal-enter-from,
.z-modal-leave-to {
  opacity: 0;
}

.z-modal-enter-from .z-modal-panel {
  opacity: 0;
  transform: translate3d(0, 8px, 0) scale(0.985);
}

.z-modal-leave-to .z-modal-panel {
  opacity: 0;
  transform: translate3d(0, 4px, 0) scale(0.99);
}

.z-modal-header--draggable {
  cursor: move;
  touch-action: none;
  user-select: none;
}

.z-modal-panel--dragging .z-modal-header {
  cursor: grabbing;
}

@media (prefers-reduced-motion: reduce) {
  .z-modal-enter-active,
  .z-modal-leave-active,
  .z-modal-enter-active .z-modal-panel,
  .z-modal-leave-active .z-modal-panel {
    transition: none;
  }
}
</style>
