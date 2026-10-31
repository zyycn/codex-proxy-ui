<script setup lang="ts">
import type { Component } from 'vue'
import type { ComponentSize } from '../../shared/types'
import { Inbox } from '@lucide/vue'
import { computed } from 'vue'
import { useLocale } from '../../locale/context'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: Component
    size?: Extract<ComponentSize, 'small' | 'default'>
    surface?: EmptySurface
  }>(),
  {
    title: undefined,
    description: undefined,
    icon: undefined,
    size: 'default',
    surface: 'subtle',
  },
)

const locale = useLocale()

type EmptySurface = 'subtle' | 'inset' | 'none'

const resolvedTitle = computed(() => props.title ?? locale.value.common.empty)
const resolvedIcon = computed(() => props.icon ?? Inbox)

const surfaceClasses: Record<EmptySurface, string> = {
  subtle: 'rounded-z-lg bg-z-fill-alter',
  inset: 'rounded-z-lg bg-z-fill-alter/70',
  none: 'bg-transparent',
}
</script>

<template>
  <div
    class="grid justify-items-center text-center"
    :class="[
      surfaceClasses[surface],
      size === 'small' ? 'gap-2 px-4 py-5' : 'gap-3 px-6 py-8',
    ]"
  >
    <slot name="icon">
      <span
        class="inline-flex items-center justify-center rounded-z bg-z-fill-tertiary text-z-text-quaternary"
        :class="size === 'small' ? 'size-8' : 'size-10'"
      >
        <component :is="resolvedIcon" :size="size === 'small' ? 16 : 18" />
      </span>
    </slot>
    <p class="m-0 text-z leading-[1.15] font-heavy text-z-text">
      {{ resolvedTitle }}
    </p>
    <p
      v-if="description"
      class="m-0 max-w-72 text-xs leading-[1.45] font-semibold text-z-text-secondary"
    >
      {{ description }}
    </p>
    <div v-if="$slots.action" class="mt-1">
      <slot name="action" />
    </div>
  </div>
</template>
