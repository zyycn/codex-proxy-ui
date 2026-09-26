<script setup lang="ts">
import { Minus, Plus } from '@lucide/vue'
import { computed, useAttrs } from 'vue'

import { useFormField } from '../form/useFormField'
import BaseIconButton from '../icon-button/BaseIconButton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    label: string
    min?: number
    max?: number
    step?: number
    unit?: string
    disabled?: boolean
    size?: 'sm' | 'md'
  }>(),
  {
    min: undefined,
    max: undefined,
    step: 1,
    unit: undefined,
    disabled: false,
    size: 'sm',
  },
)

const model = defineModel<number>({ required: true })
const attrs = useAttrs()
const { controlId, invalid, describedBy, required } = useFormField(attrs)

const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const controlAttrs = computed(() =>
  Object.fromEntries(Object.entries(attrs).filter(([key]) => !['class', 'style', 'id', 'aria-describedby', 'aria-invalid'].includes(key))),
)
const canDecrease = computed(() => !props.disabled && (props.min === undefined || model.value > props.min))
const canIncrease = computed(() => !props.disabled && (props.max === undefined || model.value < props.max))

function clampValue(value: number) {
  return Math.min(props.max ?? Number.POSITIVE_INFINITY, Math.max(props.min ?? Number.NEGATIVE_INFINITY, value))
}

function stepPrecision() {
  const decimal = String(props.step).split('.')[1]
  return decimal?.length ?? 0
}

function updateModel(event: Event) {
  const value = (event.target as HTMLInputElement).valueAsNumber
  if (Number.isFinite(value))
    model.value = clampValue(value)
}

function restoreValue(event: Event) {
  const input = event.target as HTMLInputElement
  input.value = String(model.value)
}

function stepBy(direction: -1 | 1) {
  const next = clampValue(model.value + props.step * direction)
  model.value = Number(next.toFixed(stepPrecision()))
}
</script>

<template>
  <div
    v-bind="rootAttrs"
    class="inline-flex min-w-0 items-center rounded-cp p-0.5 text-cp-text transition-[background-color,box-shadow] duration-150 motion-reduce:transition-none"
    :class="[
      size === 'md' ? 'h-cp-control' : 'h-cp-control-sm',
      disabled
        ? 'cursor-not-allowed bg-cp-bg-container-disabled'
        : invalid
          ? 'bg-(--cp-input-error-active-bg) shadow-cp-input-error-active'
          : 'bg-[var(--cp-input-bg)] shadow-cp-input hover:not-focus-within:bg-[var(--cp-input-hover-bg)] hover:not-focus-within:shadow-cp-input-hover focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
    ]"
  >
    <BaseIconButton
      :label="`减少${label}`"
      size="sm"
      variant="ghost"
      class="size-7!"
      :disabled="!canDecrease"
      @click="stepBy(-1)"
    >
      <Minus class="size-3" />
    </BaseIconButton>

    <span class="inline-flex min-w-0 flex-1 items-baseline justify-center gap-1 px-1">
      <input
        v-bind="controlAttrs"
        :id="controlId"
        :value="model"
        type="number"
        inputmode="decimal"
        :aria-label="label"
        :aria-describedby="describedBy"
        :aria-invalid="invalid || undefined"
        :aria-required="required"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="min-w-0 appearance-[textfield] border-0 bg-transparent p-0 font-mono tabular-nums text-cp-text outline-none disabled:text-cp-text-disabled [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        :class="size === 'md' ? 'w-full text-center text-cp' : 'w-9 text-right text-cp-xs font-bold'"
        @input="updateModel"
        @blur="restoreValue"
      >
      <span v-if="unit" class="shrink-0 text-[9px] font-emphasis text-cp-text-quaternary">
        {{ unit }}
      </span>
    </span>

    <BaseIconButton
      :label="`增加${label}`"
      size="sm"
      variant="ghost"
      class="size-7!"
      :disabled="!canIncrease"
      @click="stepBy(1)"
    >
      <Plus class="size-3" />
    </BaseIconButton>
  </div>
</template>
