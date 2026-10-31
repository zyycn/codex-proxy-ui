<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useFormField } from '../form/composables/useFormField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    activeText?: string
    inactiveText?: string
    inlinePrompt?: boolean
    width?: string | number
  }>(),
  {
    disabled: false,
    activeText: '',
    inactiveText: '',
    inlinePrompt: false,
    width: '',
  },
)

const emit = defineEmits<{ change: [value: boolean], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()
const model = defineModel<boolean>({ default: false })
const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('input')
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })
const { controlId, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate } = useFormField(attrs)
const hasStateText = computed(() => Boolean(props.activeText || props.inactiveText))
const inlineText = computed(() => model.value ? props.activeText : props.inactiveText)
const trackStyle = computed(() => props.width === ''
  ? undefined
  : {
      width: typeof props.width === 'number' || /^\d+(?:\.\d+)?$/.test(props.width)
        ? `${props.width}px`
        : props.width,
    })

const trackClasses = computed(() => [
  'relative inline-flex h-6 min-w-11 shrink-0 items-center rounded-full p-0.5 transition-[background-color,box-shadow] duration-180 motion-reduce:transition-none',
  props.disabled
    ? 'bg-z-bg-container-disabled shadow-none'
    : model.value
      ? 'bg-z-primary shadow-z-tertiary'
      : 'bg-(--z-switch-unchecked-bg) shadow-z-tertiary',
])
const thumbClasses = computed(() => [
  'absolute top-0.5 z-10 size-5 rounded-full bg-z-white shadow-z-tertiary transition-[left] duration-180 ease-out motion-reduce:transition-none',
  model.value ? 'left-[calc(100%-1.375rem)]' : 'left-0.5',
])
const inlineTextClasses = computed(() => [
  'pointer-events-none absolute inset-0 flex min-w-0 select-none items-center justify-center overflow-hidden text-[10px] leading-none font-heavy transition-[padding,color] duration-180 motion-reduce:transition-none',
  model.value ? 'text-z-white' : props.disabled ? 'text-z-text-secondary' : 'text-(--z-switch-unchecked-color)',
  model.value ? 'pr-6 pl-1' : 'pr-1 pl-6',
])
const inactiveTextClasses = computed(() => [
  'text-z leading-none font-emphasis transition-colors duration-150 motion-reduce:transition-none',
  model.value ? 'text-z-text-secondary' : 'text-z-primary-text',
])
const activeTextClasses = computed(() => [
  'text-z leading-none font-emphasis transition-colors duration-150 motion-reduce:transition-none',
  model.value ? 'text-z-primary-text' : 'text-z-text-secondary',
])
</script>

<template>
  <!-- 原生控件嵌套在标签内，整行保持同一点击目标 -->
  <!-- eslint-disable-next-line vue-a11y/label-has-for -->
  <label
    v-bind="rootAttrs"
    class="relative inline-flex items-center gap-2.5"
    :class="disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'"
  >
    <span v-if="inactiveText && !inlinePrompt" :class="inactiveTextClasses">
      {{ inactiveText }}
    </span>
    <input
      v-bind="controlAttrs"
      :id="controlId"
      ref="input"
      v-model="model"
      :aria-describedby="describedBy"
      :aria-invalid="invalid || undefined"
      :required="required"
      :aria-required="ariaRequired"
      type="checkbox"
      role="switch"
      class="peer sr-only"
      :aria-label="typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : label"
      :disabled="disabled"
      @change="emit('change', ($event.target as HTMLInputElement).checked); validate('change')"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event); validate('blur')"
    >
    <span
      :class="trackClasses"
      :style="trackStyle"
      class="peer-focus-visible:ring-2 peer-focus-visible:ring-z-control-outline peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-z-bg-container"
    >
      <span v-if="inlinePrompt && inlineText" :class="inlineTextClasses">
        <span class="min-w-0 truncate">{{ inlineText }}</span>
      </span>
      <span :class="thumbClasses" />
    </span>
    <span v-if="activeText && !inlinePrompt" :class="activeTextClasses">{{ activeText }}</span>
    <span v-else-if="label && !hasStateText" class="text-z font-emphasis text-z-text">
      {{ label }}
    </span>
  </label>
</template>
