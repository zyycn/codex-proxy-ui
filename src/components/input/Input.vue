<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import { CircleX, Eye, EyeOff } from '@lucide/vue'
import { computed, nextTick, shallowRef, useAttrs, useTemplateRef } from 'vue'
import { useFormField } from '../form/composables/useFormField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    placeholder?: string
    type?: string
    disabled?: boolean
    clearable?: boolean
    showPassword?: boolean
    size?: ComponentSize
  }>(),
  {
    placeholder: '',
    type: 'text',
    disabled: false,
    size: 'default',
  },
)

const emit = defineEmits<{
  input: [value: string]
  change: [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()
defineSlots<{ prefix?: () => unknown, suffix?: () => unknown }>()
const model = defineModel<string>({ default: '' })
const attrs = useAttrs()
const { controlId, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate } = useFormField(attrs)
const inputRef = useTemplateRef<HTMLInputElement>('input')
const passwordVisible = shallowRef(false)
const composing = shallowRef(false)
const inputType = computed(() => props.showPassword ? passwordVisible.value ? 'text' : 'password' : props.type)
function focus() {
  inputRef.value?.focus()
}
function clear() {
  model.value = ''
  emit('input', '')
  emit('change', '')
  validate('change')
  emit('clear')
  focus()
}
defineExpose({ focus, blur: () => inputRef.value?.blur(), select: () => inputRef.value?.select(), clear })

const sizeClasses: Record<ComponentSize, string> = {
  small: 'h-cp-control-sm gap-2 px-3 text-xs',
  default: 'h-cp-control gap-2.5 px-3.5 text-cp',
  large: 'h-cp-control-lg gap-3 px-4 text-cp-lg',
}

const containerClasses = computed(() => [
  'group/input relative inline-flex w-full min-w-0 items-center overflow-visible rounded-cp border-0 text-cp-text shadow-cp-input transition-[background-color,box-shadow,color] duration-160 motion-reduce:transition-none',
  sizeClasses[props.size],
  props.disabled
    ? 'cursor-not-allowed bg-cp-bg-container-disabled text-cp-text-disabled shadow-none'
    : invalid.value
      ? 'bg-cp-error-container hover:not-focus-within:bg-(--cp-input-error-active-bg) hover:not-focus-within:shadow-cp-input-error-active focus-within:bg-(--cp-input-error-active-bg) focus-within:shadow-cp-input-error-active'
      : [
          'bg-(--cp-input-bg)',
          'hover:not-focus-within:bg-(--cp-input-hover-bg) hover:not-focus-within:shadow-cp-input-hover',
          'focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
        ],
])

const iconClasses = computed(() => [
  'inline-flex shrink-0',
  props.disabled ? 'text-cp-text-disabled' : invalid.value ? 'text-cp-error' : 'text-cp-text-quaternary',
])

const actionClasses = 'inline-flex size-4 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-cp-text-quaternary outline-none transition-colors hover:text-cp-text-secondary focus-visible:ring-2 focus-visible:ring-cp-control-outline disabled:cursor-not-allowed disabled:text-cp-text-disabled'

function updateModel(event: Event) {
  if (composing.value)
    return
  const value = (event.target as HTMLInputElement).value
  if (value !== model.value) {
    model.value = value
    emit('input', value)
  }
}

function handleChange(event: Event) {
  updateModel(event)
  emit('change', (event.target as HTMLInputElement).value)
  validate('change')
}

function finishComposition(event: CompositionEvent) {
  composing.value = false
  // 浏览器可能紧接着发送 input，等模型同步后再补齐没有 input 的情况
  queueMicrotask(() => {
    void nextTick(() => updateModel(event))
  })
}

function syncAutofill(event: AnimationEvent) {
  if (event.animationName === 'z-input-autofill-sync')
    updateModel(event)
}
</script>

<template>
  <div v-bind="rootAttrs" class="min-w-0">
    <span :class="containerClasses">
      <span v-if="$slots.prefix" :class="iconClasses">
        <slot name="prefix" />
      </span>
      <input
        v-bind="controlAttrs"
        :id="controlId"
        ref="input"
        :value="model"
        class="z-input__field h-full min-w-0 flex-1 border-0 bg-transparent font-emphasis leading-[1.15] text-cp-text outline-0 placeholder:font-normal placeholder:text-cp-text-quaternary disabled:cursor-not-allowed disabled:text-cp-text-disabled [&[type=number]]:appearance-[textfield] [&[type=number]::-webkit-inner-spin-button]:m-0 [&[type=number]::-webkit-inner-spin-button]:appearance-none [&[type=number]::-webkit-outer-spin-button]:m-0 [&[type=number]::-webkit-outer-spin-button]:appearance-none"
        :placeholder="placeholder"
        :type="inputType"
        :disabled="disabled"
        :required="required"
        :aria-describedby="describedBy"
        :aria-invalid="invalid || undefined"
        :aria-required="ariaRequired"
        @animationstart="syncAutofill"
        @change="handleChange"
        @input="updateModel"
        @compositionstart="composing = true"
        @compositionend="finishComposition"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event); validate('blur')"
      >
      <button
        v-if="clearable && model && !disabled && (controlAttrs.readonly === undefined || controlAttrs.readonly === false)"
        type="button"
        aria-label="清空输入"
        :class="actionClasses"
        class="pointer-events-none opacity-0 group-focus-within/input:pointer-events-auto group-focus-within/input:opacity-100 group-hover/input:pointer-events-auto group-hover/input:opacity-100"
        @mousedown.prevent
        @click="clear"
      >
        <CircleX :size="14" />
      </button>
      <button
        v-if="showPassword"
        type="button"
        :class="actionClasses"
        class="z-input__password-toggle"
        :aria-label="`${passwordVisible ? '隐藏' : '显示'}${attrs['aria-label'] ?? '内容'}`"
        :aria-pressed="passwordVisible"
        :disabled="disabled"
        @mousedown.prevent
        @click="passwordVisible = !passwordVisible"
      >
        <EyeOff v-if="passwordVisible" :size="14" /><Eye v-else :size="14" />
      </button>
      <span v-if="$slots.suffix" :class="iconClasses">
        <slot name="suffix" />
      </span>
    </span>
  </div>
</template>

<style scoped>
.z-input__field:-webkit-autofill,
.z-input__field:-webkit-autofill:hover,
.z-input__field:-webkit-autofill:focus,
.z-input__field:autofill {
  animation-name: z-input-autofill-sync;
  animation-duration: 1ms;
  background-clip: text !important;
  caret-color: var(--cp-color-text);
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: var(--cp-color-text) !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}

@keyframes z-input-autofill-sync {
  from {
    opacity: 1;
  }

  to {
    opacity: 1;
  }
}
</style>
