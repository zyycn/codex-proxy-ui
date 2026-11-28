<script setup lang="ts">
import { clamp } from 'es-toolkit'
import { onMounted, useId, useTemplateRef, watch } from 'vue'

const props = defineProps<{ label: string, count: number, value: number }>()
const emit = defineEmits<{ select: [value: number] }>()
const list = useTemplateRef<HTMLElement>('list')
const id = useId()

function rowHeight() {
  return list.value?.firstElementChild?.getBoundingClientRect().height ?? 0
}

function align() {
  const height = rowHeight()
  if (list.value && height && Math.round(list.value.scrollTop / height) !== props.value)
    list.value.scrollTop = props.value * height
}

function onScroll() {
  const height = rowHeight()
  if (list.value && height) {
    const value = clamp(Math.round(list.value.scrollTop / height), 0, props.count - 1)
    if (value !== props.value)
      emit('select', value)
  }
}

function keydown(event: KeyboardEvent) {
  const values: Record<string, number> = { ArrowDown: props.value + 1, ArrowUp: props.value - 1, Home: 0, End: props.count - 1 }
  const value = values[event.key]
  if (value === undefined)
    return
  event.preventDefault()
  emit('select', clamp(value, 0, props.count - 1))
}

onMounted(align)
watch(() => props.value, align, { flush: 'post' })
</script>

<template>
  <div
    ref="list" role="listbox" tabindex="0" :aria-label="label" :aria-activedescendant="`${id}-${value}`"
    class="z-scrollbar-hidden relative h-35 min-w-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-z-sm py-14 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-z-control-outline"
    @scroll="onScroll" @keydown="keydown"
  >
    <button
      v-for="n in count" :id="`${id}-${n - 1}`" :key="n" type="button" tabindex="-1" role="option" :aria-selected="n - 1 === value"
      class="block h-7 w-full snap-center rounded-z-sm border-0 bg-transparent text-center text-z-xs text-z-text-secondary tabular-nums hover:bg-z-fill-tertiary aria-selected:font-bold aria-selected:text-z-primary"
      @mousedown.prevent @click="list?.focus({ preventScroll: true }); emit('select', n - 1)"
    >
      {{ String(n - 1).padStart(2, '0') }}
    </button>
  </div>
</template>
