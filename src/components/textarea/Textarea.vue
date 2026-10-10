<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, shallowRef, useAttrs, useTemplateRef, watch } from 'vue'
import { useFormField } from '../form/composables/useFormField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    placeholder?: string
    disabled?: boolean
    size?: ComponentSize
    rows?: number
    autosize?: boolean | { minRows?: number, maxRows?: number }
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  }>(),
  {
    placeholder: '',
    disabled: false,
    size: 'default',
    rows: 5,
    resize: 'vertical',
  },
)

const emit = defineEmits<{ input: [value: string], change: [value: string], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()
const model = defineModel<string>({ default: '' })
const attrs = useAttrs()
const { controlId, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate } = useFormField(attrs)
const textareaRef = useTemplateRef<HTMLTextAreaElement>('textarea')
const composing = shallowRef(false)
function updateModel(event: Event) {
  if (composing.value)
    return
  const value = (event.target as HTMLTextAreaElement).value
  if (value !== model.value) {
    model.value = value
    emit('input', value)
  }
}

function handleChange(event: Event) {
  updateModel(event)
  emit('change', (event.target as HTMLTextAreaElement).value)
  validate('change')
}

function finishComposition(event: CompositionEvent) {
  composing.value = false
  // 浏览器可能紧接着发送 input，等模型同步后再补齐没有 input 的情况
  queueMicrotask(() => {
    void nextTick(() => updateModel(event))
  })
}
function resizeToContent() {
  const element = textareaRef.value
  if (!element)
    return
  if (!props.autosize) {
    element.style.height = ''
    return
  }
  const options = typeof props.autosize === 'object' ? props.autosize : {}
  const style = getComputedStyle(element)
  const lineHeight = Number.parseFloat(style.lineHeight)
  const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom)
  const minHeight = (options.minRows ?? props.rows) * lineHeight + padding
  const maxHeight = (options.maxRows ?? Infinity) * lineHeight + padding
  element.style.height = 'auto'
  element.style.height = `${Math.max(minHeight, Math.min(maxHeight, element.scrollHeight))}px`
}
watch([model, () => props.autosize, () => props.rows, () => props.size], () => {
  void nextTick(resizeToContent)
}, { immediate: true, deep: true })
let previousWidth = 0
useResizeObserver(textareaRef, ([entry]) => {
  if (entry && entry.contentRect.width !== previousWidth) {
    previousWidth = entry.contentRect.width
    resizeToContent()
  }
})
function clear() {
  model.value = ''
  emit('input', '')
  emit('change', '')
  validate('change')
}
defineExpose({ focus: () => textareaRef.value?.focus(), blur: () => textareaRef.value?.blur(), select: () => textareaRef.value?.select(), clear })

const sizeClasses: Record<ComponentSize, string> = {
  small: 'px-3 py-2.5 text-xs',
  default: 'px-3.5 py-3 text-cp',
  large: 'px-4 py-3.5 text-cp-lg',
}

const textareaClasses = computed(() => [
  'cp-scrollbar w-full rounded-cp border-0 text-cp-text shadow-cp-input outline-none transition-[background-color,box-shadow,color] duration-160 placeholder:font-normal placeholder:text-cp-text-quaternary motion-reduce:transition-none',
  'leading-[1.55] font-emphasis',
  sizeClasses[props.size],
  props.disabled
    ? 'cursor-not-allowed bg-cp-bg-container-disabled text-cp-text-disabled shadow-none'
    : invalid.value
      ? 'bg-cp-error-container hover:not-focus:bg-(--cp-input-error-active-bg) hover:not-focus:shadow-cp-input-error-active focus:bg-(--cp-input-error-active-bg) focus:shadow-cp-input-error-active'
      : [
          'bg-(--cp-input-bg)',
          'hover:not-focus:bg-(--cp-input-hover-bg) hover:not-focus:shadow-cp-input-hover',
          'focus:bg-(--cp-input-active-bg) focus:shadow-cp-input-active',
        ],
])
</script>

<template>
  <div v-bind="rootAttrs" class="min-w-0">
    <textarea
      v-bind="controlAttrs"
      :id="controlId"
      ref="textarea"
      :value="model"
      :class="textareaClasses"
      :style="{ resize: disabled || autosize ? 'none' : resize }"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :aria-required="ariaRequired"
      @input="updateModel"
      @change="handleChange"
      @compositionstart="composing = true"
      @compositionend="finishComposition"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event); validate('blur')"
    />
  </div>
</template>
