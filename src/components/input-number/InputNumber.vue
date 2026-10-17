<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import { Minus, Plus } from '@lucide/vue'
import { computed, shallowRef, useAttrs, useTemplateRef, watch } from 'vue'

import { useFormField } from '../form/composables/useFormField'
import IconButton from '../icon-button/IconButton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
    unit?: string
    disabled?: boolean
    readonly?: boolean
    controls?: boolean
    precision?: number
    size?: Extract<ComponentSize, 'small' | 'default'>
  }>(),
  {
    min: undefined,
    max: undefined,
    step: 1,
    unit: undefined,
    disabled: false,
    controls: true,
    size: 'default',
  },
)

const emit = defineEmits<{ input: [value: string], change: [value: number], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()
const model = defineModel<number>({ required: true })
const attrs = useAttrs()
const { controlId, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate } = useFormField(attrs)
const inputRef = useTemplateRef<HTMLInputElement>('input')
const draft = shallowRef(String(model.value))
const controlLabel = computed(() => attrs['aria-label'] ?? '数值')
const canDecrease = computed(() => !props.disabled && !props.readonly && (props.min === undefined || model.value > props.min))
const canIncrease = computed(() => !props.disabled && !props.readonly && (props.max === undefined || model.value < props.max))
watch(model, (value) => {
  draft.value = String(value)
})
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })

function clampValue(value: number) {
  return Math.min(props.max ?? Number.POSITIVE_INFINITY, Math.max(props.min ?? Number.NEGATIVE_INFINITY, value))
}

function decimalPrecision(value: number) {
  const [coefficient, exponent = '0'] = String(value).toLowerCase().split('e')
  return Math.max(0, (coefficient?.split('.')[1]?.length ?? 0) - Number(exponent))
}

function updateDraft(event: Event) {
  draft.value = (event.target as HTMLInputElement).value
  emit('input', draft.value)
}

function commit(value: number) {
  const next = clampValue(props.precision === undefined ? value : Number(value.toFixed(props.precision)))
  if (next !== model.value) {
    model.value = next
    emit('change', next)
    validate('change')
  }
  draft.value = String(next)
}

function commitDraft() {
  const value = Number(draft.value)
  if (draft.value !== '' && Number.isFinite(value))
    commit(value)
  else draft.value = String(model.value)
}

function stepBy(direction: -1 | 1) {
  const precision = Math.max(decimalPrecision(model.value), decimalPrecision(props.step))
  const value = model.value + props.step * direction
  const next = precision <= 100 ? Number(value.toFixed(precision)) : value
  commit(next)
}
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="z-input-number inline-flex min-w-0 items-center rounded-cp px-1.5 text-cp-text transition-[background-color,box-shadow] duration-150 motion-reduce:transition-none"
    :data-size="size"
    :class="[
      size === 'default' ? 'h-cp-control' : 'h-cp-control-sm',
      disabled
        ? 'cursor-not-allowed bg-cp-bg-container-disabled'
        : invalid
          ? 'bg-cp-error-container shadow-cp-input hover:not-focus-within:bg-(--cp-input-error-active-bg) hover:not-focus-within:shadow-cp-input-error-active focus-within:bg-(--cp-input-error-active-bg) focus-within:shadow-cp-input-error-active'
          : 'bg-(--cp-input-bg) shadow-cp-input hover:not-focus-within:bg-(--cp-input-hover-bg) hover:not-focus-within:shadow-cp-input-hover focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
    ]"
  >
    <IconButton
      v-if="controls"
      :aria-label="`减少${controlLabel}`"
      size="small"
      :class="size === 'default' ? 'size-6!' : 'size-5!'"
      :disabled="!canDecrease"
      @click="stepBy(-1)"
    >
      <Minus class="size-3" />
    </IconButton>

    <span class="inline-flex min-w-0 flex-1 items-baseline justify-center gap-1 px-1">
      <input
        v-bind="controlAttrs"
        :id="controlId"
        ref="input"
        :value="draft"
        type="number"
        inputmode="decimal"
        :aria-label="String(controlLabel)"
        :aria-describedby="describedBy"
        :aria-invalid="invalid || undefined"
        :required="required"
        :aria-required="ariaRequired"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :readonly="readonly"
        class="min-w-0 appearance-[textfield] border-0 bg-transparent p-0 font-mono tabular-nums text-cp-text outline-none disabled:text-cp-text-disabled [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        :class="size === 'default' ? 'w-full text-center text-cp' : 'w-9 text-right text-cp-xs font-bold'"
        @input="updateDraft"
        @change="commitDraft"
        @focus="emit('focus', $event)"
        @blur="commitDraft(); emit('blur', $event); validate('blur')"
      >
      <span v-if="unit" class="shrink-0 text-[9px] font-emphasis text-cp-text-quaternary">
        {{ unit }}
      </span>
    </span>

    <IconButton
      v-if="controls"
      :aria-label="`增加${controlLabel}`"
      size="small"
      :class="size === 'default' ? 'size-6!' : 'size-5!'"
      :disabled="!canIncrease"
      @click="stepBy(1)"
    >
      <Plus class="size-3" />
    </IconButton>
  </div>
</template>
