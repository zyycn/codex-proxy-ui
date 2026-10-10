<script setup lang="ts">
import type { PopoverArrowSurfaceClass, PopoverPlacement, PopoverTrigger } from './types'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, useAttrs, useId, watch } from 'vue'
import { usePopoverPosition } from './composables/usePopoverPosition'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    placement?: PopoverPlacement
    trigger?: PopoverTrigger
    offset?: number
    disabled?: boolean
    /** 包含 hover 的触发方式打开弹窗的延迟（毫秒）；click 触发不生效。 */
    hoverDelay?: number
    referenceElement?: HTMLElement | null
    role?: 'tooltip' | 'dialog'
    animatePosition?: boolean
    /** 箭头贴合不同内容边缘时使用的表面类；字符串表示所有边缘共用。 */
    arrowSurfaceClass?: PopoverArrowSurfaceClass
  }>(),
  {
    placement: 'bottom-end',
    trigger: 'click',
    offset: 6,
    disabled: false,
    hoverDelay: 400,
    referenceElement: null,
    animatePosition: false,
  },
)

const emit = defineEmits<{ open: [], opened: [], close: [], closed: [] }>()
defineSlots<{ reference: (props: { open: boolean, close: () => void, toggle: () => void, id: string }) => unknown, default: (props: { open: boolean, close: () => void, toggle: () => void }) => unknown }>()
const panelId = `z-popover-${useId()}`
let previouslyFocused: HTMLElement | null = null
const open = defineModel<boolean>({ default: false })
const attrs = useAttrs()

const rootRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)
const { popoverStyle, popoverArrowStyle, arrowEdge, updatePopoverPosition } = usePopoverPosition(props, open, rootRef, popoverRef)
const hoverCloseTimer = shallowRef<number>()
const hoverOpenTimer = shallowRef<number>()
const viewportTarget = computed(() => (open.value && typeof window !== 'undefined' ? window : null))

const popoverClasses = computed(() => [
  'fixed z-50 overflow-visible rounded-cp-lg border-0 bg-cp-bg-elevated font-sans text-left text-cp leading-relaxed text-cp-text shadow-cp',
  props.animatePosition
    ? 'transition-[left,top] duration-150 ease-out motion-reduce:transition-none'
    : undefined,
])
const popoverArrowSurfaceClass = computed(() => {
  if (typeof props.arrowSurfaceClass === 'string')
    return props.arrowSurfaceClass

  return props.arrowSurfaceClass?.[arrowEdge.value] ?? 'bg-inherit'
})

async function openPopover() {
  if (props.disabled || open.value)
    return

  clearHoverOpenTimer()
  clearHoverCloseTimer()
  open.value = true
  await nextTick()
  updatePopoverPosition()
}

function closePopover() {
  clearHoverOpenTimer()
  clearHoverCloseTimer()
  open.value = false
}

function togglePopover() {
  if (!supportsClickTrigger()) {
    return
  }

  if (open.value) {
    closePopover()
    return
  }

  void openPopover()
}

function supportsClickTrigger() {
  return props.trigger === 'click' || props.trigger === 'hover-click'
}

function supportsHoverTrigger() {
  return props.trigger === 'hover' || props.trigger === 'hover-click'
}

function clearHoverCloseTimer() {
  if (hoverCloseTimer.value === undefined) {
    return
  }

  window.clearTimeout(hoverCloseTimer.value)
  hoverCloseTimer.value = undefined
}

function clearHoverOpenTimer() {
  if (hoverOpenTimer.value === undefined) {
    return
  }

  window.clearTimeout(hoverOpenTimer.value)
  hoverOpenTimer.value = undefined
}

function handleHoverEnter() {
  if (!supportsHoverTrigger()) {
    return
  }

  clearHoverCloseTimer()
  // 延迟打开：鼠标稳定悬停一小段时间再展示，避免扫过表格时弹窗频繁闪烁。
  if (hoverOpenTimer.value === undefined) {
    hoverOpenTimer.value = window.setTimeout(() => {
      hoverOpenTimer.value = undefined
      void openPopover()
    }, props.hoverDelay)
  }
}

function handleHoverLeave() {
  if (!supportsHoverTrigger()) {
    return
  }

  clearHoverOpenTimer()
  clearHoverCloseTimer()
  hoverCloseTimer.value = window.setTimeout(closePopover, 90)
}

onClickOutside(rootRef, closePopover, { ignore: [popoverRef] })
useEventListener(rootRef, 'click', (event) => {
  event.stopPropagation()
  togglePopover()
})
useEventListener(rootRef, ['mouseenter', 'focusin'], handleHoverEnter)
useEventListener(rootRef, ['mouseleave', 'focusout'], handleHoverLeave)
useEventListener(popoverRef, ['mouseenter', 'focusin'], handleHoverEnter)
useEventListener(popoverRef, ['mouseleave', 'focusout'], handleHoverLeave)
useEventListener(viewportTarget, 'keydown', (event) => {
  if (event instanceof KeyboardEvent && event.key === 'Escape') {
    if (open.value) {
      event.preventDefault()
      event.stopPropagation()
      closePopover()
    }
  }
})
watch(open, (visible, previous) => {
  if (visible) {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    emit('open')
  }
  else if (previous) {
    emit('close')
  }
}, { immediate: true })
function restoreFocus() {
  if (document.activeElement === document.body && previouslyFocused?.isConnected)
    previouslyFocused.focus()
  previouslyFocused = null
}
function finishLeave() {
  if (open.value)
    return
  restoreFocus()
  emit('closed')
}
defineExpose({ open: openPopover, close: closePopover, focus: () => (props.referenceElement ?? rootRef.value?.querySelector<HTMLElement>('button, [tabindex]'))?.focus(), updatePosition: updatePopoverPosition })
onBeforeUnmount(() => {
  clearHoverOpenTimer()
  clearHoverCloseTimer()
  restoreFocus()
})
</script>

<template>
  <div ref="rootRef" class="relative inline-flex w-fit max-w-full overflow-visible" v-bind="attrs">
    <slot :id="panelId" name="reference" :open="open" :close="closePopover" :toggle="togglePopover" />

    <Teleport to="body">
      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none"
        enter-from-class="-translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in motion-reduce:transition-none"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        @after-enter="open && emit('opened')"
        @after-leave="finishLeave"
      >
        <div
          v-if="open"
          :id="panelId"
          ref="popoverRef"
          :role="role"
          data-cp-overlay
          :class="popoverClasses"
          :style="popoverStyle"
        >
          <span
            class="pointer-events-none absolute size-2 rotate-45"
            :class="[
              popoverArrowSurfaceClass,
              props.animatePosition
                ? 'transition-[left,top] duration-150 ease-out motion-reduce:transition-none'
                : undefined,
            ]"
            :style="popoverArrowStyle"
          />
          <slot :open="open" :close="closePopover" :toggle="togglePopover" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
