<script setup lang="ts">
import { computed } from 'vue'

type SkeletonShape = 'text' | 'block' | 'circle'

const props = withDefaults(
  defineProps<{
    as?: keyof HTMLElementTagNameMap
    shape?: SkeletonShape
    animated?: boolean
  }>(),
  {
    as: 'span',
    shape: 'block',
    animated: true,
  },
)

const shapeClasses: Record<SkeletonShape, string> = {
  text: 'h-3 rounded-full',
  block: 'rounded-z',
  circle: 'rounded-full',
}

const classes = computed(() => [
  'block bg-z-fill-secondary',
  shapeClasses[props.shape],
  props.animated ? 'motion-safe:animate-z-skeleton motion-reduce:animate-none' : undefined,
])
</script>

<template>
  <component :is="as" :class="classes" />
</template>
