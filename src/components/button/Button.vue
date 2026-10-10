<script setup lang="ts">
import type { ComponentSize } from '../../shared/types'
import type { ButtonProps } from './types'
import { LoaderCircle } from '@lucide/vue'
import { computed, useTemplateRef } from 'vue'
import { buttonSurface } from './utils/surface'

const props = withDefaults(
  defineProps<ButtonProps>(),
  {
    variant: 'solid',
    size: 'default',
    loading: false,
    disabled: false,
    type: 'default',
    nativeType: 'button',
  },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

defineSlots<{
  icon?: () => unknown
  loading?: () => unknown
  default: () => unknown
}>()

const sizeClasses: Record<ComponentSize, string> = {
  small: 'h-cp-control-sm gap-1.5 px-3 text-xs',
  default: 'h-cp-control gap-2 px-4 text-cp',
  large: 'h-cp-control-lg gap-2.5 px-5 text-cp-lg',
}

const spinnerSizes: Record<ComponentSize, number> = {
  small: 14,
  default: 15,
  large: 17,
}

const buttonRef = useTemplateRef<HTMLButtonElement>('button')
defineExpose({ focus: () => buttonRef.value?.focus(), blur: () => buttonRef.value?.blur(), get element() {
  return buttonRef.value
} })

const classes = computed(() => [
  'inline-flex shrink-0 touch-manipulation items-center justify-center rounded-cp-sm border-0 font-bold leading-none outline-none transition-[background-color,box-shadow,color,opacity,transform] duration-150 motion-safe:active:translate-y-px motion-safe:active:scale-[0.985] motion-reduce:transition-none',
  'focus-visible:ring-2 focus-visible:ring-cp-control-outline focus-visible:ring-offset-2 focus-visible:ring-offset-cp-bg-container',
  'disabled:cursor-not-allowed disabled:transform-none disabled:bg-cp-bg-container-disabled disabled:text-cp-text-disabled disabled:shadow-none',
  sizeClasses[props.size],
  buttonSurface(props.type, props.variant),
])
</script>

<template>
  <button ref="button" :type="nativeType" :class="classes" :disabled="disabled || loading" :aria-busy="loading || undefined" @click="emit('click', $event)">
    <span v-if="loading" class="inline-grid shrink-0 place-items-center leading-none">
      <slot name="loading">
        <LoaderCircle class="animate-spin motion-reduce:animate-none" :size="spinnerSizes[size]" />
      </slot>
    </span>
    <span v-else-if="$slots.icon" class="inline-grid shrink-0 place-items-center">
      <slot name="icon" />
    </span>
    <span class="inline-flex min-w-0 items-center justify-center gap-2">
      <slot />
    </span>
  </button>
</template>
