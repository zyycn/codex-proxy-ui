<script setup lang="ts">
import type { Component } from 'vue'
import type { ComponentSize } from '../../shared/types'
import { useResizeObserver } from '@vueuse/core'

import { clamp } from 'es-toolkit'
import { computed, nextTick, shallowRef, useAttrs, useTemplateRef, watch } from 'vue'
import { useComponentSize } from '../../shared/size'
import { useFormField } from '../form/composables/useFormField'
import { inputSurfaceClass } from '../input/styles'

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
    validateEvent?: boolean
  }>(),
  {
    validateEvent: true,
    disabled: false,
    display: 'label',
  },
)
const emit = defineEmits<{ change: [value: string] }>()

const componentSize = useComponentSize(() => props.size)

const attrs = useAttrs()
const rootRef = useTemplateRef<HTMLElement>('root')
const optionRefs = useTemplateRef<HTMLButtonElement[]>('option')
const { controlId, labelledBy, describedBy, invalid, ariaRequired, validate } = useFormField(attrs, () => props.validateEvent, { labelable: false })
defineExpose({ focus: () => rootRef.value?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus() })
const model = defineModel<string>({ required: true })

const activeIndex = computed(() => props.options.findIndex(option => option.value === model.value))
const tabStop = computed(() => {
  if (props.disabled)
    return -1
  if (activeIndex.value >= 0 && !props.options[activeIndex.value]?.disabled)
    return activeIndex.value
  return props.options.findIndex(option => !option.disabled)
})
const optionCount = computed(() => clamp(props.options.length, 1, Number.POSITIVE_INFINITY))
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${optionCount.value}, minmax(max-content, 1fr))`,
}))
const indicatorStyle = shallowRef<{ width: string, transform: string, transitionProperty?: 'none' }>()
let interactionTarget: string | undefined

function updateIndicator(animate = false) {
  const option = rootRef.value?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[activeIndex.value]
  if (!option?.offsetWidth) {
    indicatorStyle.value = undefined
    return
  }

  const width = `${option.offsetWidth}px`
  const transform = `translateX(${option.offsetLeft}px)`
  const previous = indicatorStyle.value
  // 重复的尺寸通知不应打断正在进行的切换动画。
  if (previous?.width === width && previous.transform === transform)
    return
  indicatorStyle.value = {
    width,
    transform,
    transitionProperty: animate && previous ? undefined : 'none',
  }
}

watch([model, activeIndex, () => props.options, rootRef], ([value], [previous]) => {
  const changed = value !== previous
  updateIndicator(changed && value === interactionTarget)
  if (changed)
    interactionTarget = undefined
}, { flush: 'post' })
useResizeObserver(() => [rootRef.value, ...(optionRefs.value ?? [])], () => updateIndicator())

const rootClasses: Record<ComponentSize, string> = {
  small: 'h-z-control-sm min-h-z-control-sm',
  default: 'h-z-control min-h-z-control',
  large: 'h-z-control-lg min-h-z-control-lg',
}
const optionClasses: Record<ComponentSize, string> = {
  small: 'px-2 text-z-xs',
  default: 'px-3 text-xs',
  large: 'px-4 text-z',
}

function enabledIndexes() {
  return props.options.flatMap((option, index) => (option.disabled ? [] : [index]))
}

function selectOption(index: number) {
  const option = props.options[index]
  if (props.disabled || !option || option.disabled || option.value === model.value)
    return
  // 路由等受控场景会稍后回写选中值，等目标生效时才播放动画。
  interactionTarget = option.value
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
    class="relative inline-grid min-w-0 max-w-full items-stretch overflow-x-auto rounded-z p-0.75 scrollbar-none [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:size-0"
    :class="[rootClasses[componentSize], invalid && !disabled ? 'bg-z-error-container' : inputSurfaceClass]"
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
      v-if="indicatorStyle && activeIndex >= 0"
      class="pointer-events-none absolute inset-y-0.75 left-0 rounded-z bg-z-bg-container shadow-z-tertiary transition-[transform,width] duration-200 ease-out motion-reduce:transition-none"
      :style="indicatorStyle"
    />
    <button
      v-for="(option, index) in options"
      :key="option.value"
      ref="option"
      class="relative z-10 inline-flex touch-manipulation items-center justify-center gap-1.5 rounded-z border-0 bg-transparent leading-none font-emphasis outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-z-control-outline motion-reduce:transition-none"
      :class="[
        optionClasses[componentSize],
        model === option.value ? 'text-z-text' : 'text-z-text-secondary hover:text-z-text',
        disabled || option.disabled ? 'cursor-not-allowed opacity-60 hover:text-z-text-secondary' : undefined,
        display === 'icon' ? 'px-0' : undefined,
      ]"
      type="button"
      role="radio"
      :aria-checked="model === option.value"
      :aria-label="display === 'icon' ? option.label : undefined"
      :tabindex="index === tabStop ? 0 : -1"
      :disabled="disabled || option.disabled"
      @click="selectOption(index)"
      @keydown="handleKeydown($event, index)"
    >
      <component :is="option.icon" v-if="option.icon" class="size-3.5 shrink-0" />
      <span v-if="display === 'label'" class="whitespace-nowrap">{{ option.label }}</span>
    </button>
  </div>
</template>
