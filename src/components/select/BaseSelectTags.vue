<script setup lang="ts">
import type { SelectOption } from './types'
import { useEventListener } from '@vueuse/core'
import { computed, nextTick, ref, useId, watch } from 'vue'
import BasePopover from '../popover/BasePopover.vue'
import BaseScrollbar from '../scrollbar/BaseScrollbar.vue'
import BaseTag from '../tag/BaseTag.vue'

const props = defineProps<{
  options: SelectOption[]
  size: 'sm' | 'md'
  disabled?: boolean
  collapse?: boolean
  tooltip?: boolean
  limit: number
  menuOpen: boolean
}>()
const emit = defineEmits<{ remove: [value: string], focusControl: [] }>()
const open = ref(false)
const trigger = ref<HTMLButtonElement | null>(null)
const panelId = useId()
const panel = ref<HTMLElement | null>(null)
const visible = computed(() => props.collapse ? props.options.slice(0, Math.max(1, props.limit)) : props.options)
const hidden = computed(() => props.options.slice(visible.value.length))

async function remove(value: string, event: MouseEvent) {
  emit('remove', value)
  // 键盘移除后将焦点交还仍存在的控件，鼠标连续移除保持浮层。
  if (event.detail === 0) {
    await nextTick()
    if (open.value && hidden.value.length)
      trigger.value?.focus()
    else emit('focusControl')
  }
}
async function focusHidden() {
  if (props.disabled || props.menuOpen)
    return
  open.value = true
  await nextTick()
  const target = panel.value?.querySelector<HTMLButtonElement>('button') ?? panel.value
  target?.focus()
}
function close(event: KeyboardEvent) {
  if (!open.value)
    return
  event.preventDefault()
  event.stopPropagation()
  open.value = false
  emit('focusControl')
}
useEventListener(panel, 'keydown', (event) => {
  if (event.key === 'Escape')
    close(event)
})
watch(() => [props.menuOpen, props.disabled, hidden.value.length], () => {
  if (props.menuOpen || props.disabled || !hidden.value.length)
    open.value = false
})
</script>

<template>
  <div class="pointer-events-none flex items-center gap-1" :class="collapse ? 'flex-nowrap' : 'flex-wrap'">
    <BaseTag
      v-for="option in visible"
      :key="option.value"
      :size="size"
      :closable="!disabled && !option.disabled"
      :disabled="disabled"
      :close-label="`移除 ${option.label}`"
      class="min-w-0 [&_button]:pointer-events-auto"
      @close="remove(option.value, $event)"
    >
      <span class="block max-w-48 truncate" :title="option.label">{{ option.label }}</span>
    </BaseTag>
    <BasePopover
      v-if="hidden.length && tooltip"
      v-model="open"
      trigger="hover-click"
      placement="bottom"
      :disabled="disabled || menuOpen"
      class="pointer-events-auto shrink-0"
    >
      <template #trigger>
        <button
          ref="trigger"
          type="button"
          :disabled="disabled"
          :aria-label="`查看其余 ${hidden.length} 个已选项`"
          :aria-expanded="open"
          :aria-controls="open ? panelId : undefined"
          aria-haspopup="dialog"
          class="cursor-pointer rounded-cp border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-cp-control-outline disabled:cursor-not-allowed"
          @keydown.esc="close"
          @keydown.enter.prevent="focusHidden"
          @keydown.space.prevent="focusHidden"
          @keydown.down.prevent="focusHidden"
        >
          <BaseTag :size="size" :disabled="disabled">
            +{{ hidden.length }}
          </BaseTag>
        </button>
      </template>
      <div :id="panelId" ref="panel" role="dialog" tabindex="-1" aria-label="其余已选项" class="max-w-[min(20rem,calc(100vw-2rem))] p-2">
        <BaseScrollbar max-height="12rem">
          <div class="flex flex-wrap gap-1">
            <BaseTag
              v-for="option in hidden"
              :key="option.value"
              :size="size"
              :closable="!disabled && !option.disabled"
              :disabled="disabled"
              :close-label="`移除 ${option.label}`"
              @close="remove(option.value, $event)"
            >
              <span class="block max-w-56 truncate" :title="option.label">{{ option.label }}</span>
            </BaseTag>
          </div>
        </BaseScrollbar>
      </div>
    </BasePopover>
    <BaseTag v-else-if="hidden.length" :size="size" :disabled="disabled" :title="hidden.map(option => option.label).join('、')">
      +{{ hidden.length }}
    </BaseTag>
  </div>
</template>
