<script setup lang="ts">
import type { Component } from 'vue'
import type { ComponentSize } from '../../shared/types'

import { clamp } from 'es-toolkit'
import { computed, nextTick, useAttrs, useTemplateRef } from 'vue'
import { useFormField } from '../form/composables/useFormField'

export interface SegmentedOption {
  label: string
  value: string
  icon?: Component
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
    options: SegmentedOption[]
    disabled?: boolean
    display?: 'label' | 'icon'
    size?: ComponentSize
  }>(),
  {
    disabled: false,
    display: 'label',
    size: 'default',
  },
)

const emit = defineEmits<{ change: [value: string] }>()
const attrs = useAttrs()
const rootRef = useTemplateRef<HTMLElement>('root')
const { controlId, labelledBy, describedBy, invalid, ariaRequired, validate } = useFormField(attrs)
defineExpose({ focus: () => rootRef.value?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus() })
const model = defineModel<string>({ required: true })

const activeIndex = computed(() => props.options.findIndex(option => option.value === model.value))
const optionCount = computed(() => clamp(props.options.length, 1, Number.POSITIVE_INFINITY))
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${optionCount.value}, minmax(0, 1fr))`,
}))
const indicatorStyle = computed(() => ({
  width: `calc((100% - 6px) / ${optionCount.value})`,
  transform: `translateX(${activeIndex.value * 100}%)`,
}))

const rootClasses: Record<ComponentSize, string> = {
  small: 'h-cp-control-sm',
  default: 'h-cp-control',
  large: 'h-cp-control-lg',
}
const optionClasses: Record<ComponentSize, string> = {
  small: 'h-6.5 px-2 text-cp-xs',
  default: 'h-8 px-3 text-xs',
  large: 'h-9.5 px-4 text-cp',
}

function enabledIndexes() {
  return props.options.flatMap((option, index) => (option.disabled ? [] : [index]))
}

function selectOption(index: number) {
  const option = props.options[index]
  if (props.disabled || !option || option.disabled || option.value === model.value)
    return
  model.value = option.value
  emit('change', option.value)
  validate('change')
}

async function handleKeydown(event: KeyboardEvent, index: number) {
  const indexes = enabledIndexes()
  if (indexes.length === 0)
    return

  const current = indexes.indexOf(index)
  let nextIndex: number | undefined

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown')
    nextIndex = indexes[(current + 1 + indexes.length) % indexes.length]
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
    nextIndex = indexes[(current - 1 + indexes.length) % indexes.length]
  else if (event.key === 'Home')
    nextIndex = indexes[0]
  else if (event.key === 'End')
    nextIndex = indexes[indexes.length - 1]
  else return

  if (nextIndex === undefined)
    return

  event.preventDefault()
  const buttons = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('button')
  selectOption(nextIndex)
  await nextTick()
  buttons?.[nextIndex]?.focus()
}
</script>

<template>
  <div
    :id="controlId"
    ref="root"
    tabindex="-1"
    class="relative inline-grid items-center rounded-cp bg-(--cp-input-bg) p-0.75"
    :class="rootClasses[size]"
    :style="gridStyle"
    role="radiogroup"
    :aria-label="ariaLabel"
    :aria-labelledby="typeof attrs['aria-labelledby'] === 'string' ? attrs['aria-labelledby'] : ariaLabel ? undefined : labelledBy"
    :aria-describedby="describedBy"
    :aria-invalid="invalid || undefined"
    :aria-required="ariaRequired"
    :aria-disabled="disabled || undefined"
  >
    <span
      v-if="activeIndex >= 0"
      class="pointer-events-none absolute inset-y-0.75 left-0.75 rounded-cp bg-cp-bg-container shadow-cp-tertiary transition-transform duration-200 ease-out motion-reduce:transition-none"
      :style="indicatorStyle"
    />
    <button
      v-for="(option, index) in options"
      :key="option.value"
      class="relative z-10 inline-flex min-w-0 touch-manipulation items-center justify-center gap-1.5 rounded-cp border-0 bg-transparent leading-none font-emphasis outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-cp-control-outline motion-reduce:transition-none"
      :class="[
        optionClasses[size],
        model === option.value ? 'text-cp-text' : 'text-cp-text-secondary hover:text-cp-text',
        disabled || option.disabled ? 'cursor-not-allowed opacity-60 hover:text-cp-text-secondary' : undefined,
        display === 'icon' ? 'px-0' : undefined,
      ]"
      type="button"
      role="radio"
      :aria-checked="model === option.value"
      :aria-label="display === 'icon' ? option.label : undefined"
      :title="display === 'icon' ? option.label : undefined"
      :tabindex="model === option.value || (activeIndex < 0 && index === 0) ? 0 : -1"
      :disabled="disabled || option.disabled"
      @click="selectOption(index)"
      @keydown="handleKeydown($event, index)"
    >
      <component :is="option.icon" v-if="option.icon" class="size-3.5 shrink-0" />
      <span v-if="display === 'label'" class="truncate">{{ option.label }}</span>
    </button>
  </div>
</template>
