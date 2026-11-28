<script setup lang="ts">
import type { Dayjs } from 'dayjs'
import { Clock } from '@lucide/vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { computed, nextTick, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { useLocale } from '../../../locale/context'
import Button from '../../button/Button.vue'
import { getInputClasses, inputFieldClass } from '../../input/styles'
import { calendarLocales, parseDate } from '../utils/date'
import DatePickerTimeColumn from './DatePickerTimeColumn.vue'

const props = defineProps<{ value: string, label: string, alignEnd: boolean, disabled: boolean, locked: boolean, editable: boolean }>()
const emit = defineEmits<{ change: [value: Dayjs] }>()
const locale = useLocale()
const open = shallowRef(false)
const text = shallowRef(props.value)
const root = useTemplateRef<HTMLElement>('root')
const input = useTemplateRef<HTMLInputElement>('input')
const panel = useTemplateRef<HTMLElement>('panel')
const id = useId()
const units = ['hour', 'minute', 'second'] as const
const labels = computed(() => new Intl.DisplayNames(locale.value.name, { type: 'dateTimeField' }))
const parsed = computed(() => parseDate(text.value, text.value.length === 5 ? 'HH:mm' : 'HH:mm:ss', calendarLocales[locale.value.name]))
const parts = computed(() => units.map(unit => parsed.value?.[unit]() ?? 0))

watch(() => props.value, value => text.value = value)
watch(() => props.disabled || props.locked, blocked => blocked && close())

function select(index: number, value: number) {
  text.value = parts.value.map((part, i) => String(i === index ? value : part).padStart(2, '0')).join(':')
}

function openField(event: FocusEvent | MouseEvent) {
  if (!props.locked && !(event.type === 'focus' && root.value?.contains(event.relatedTarget as Node | null)))
    open.value = true
}

async function focusWheel() {
  if (props.locked)
    return
  open.value = true
  await nextTick()
  panel.value?.querySelector<HTMLElement>('[role="listbox"]')?.focus({ preventScroll: true })
}

function close() {
  open.value = false
  text.value = props.value
}

function apply() {
  const value = parsed.value
  close()
  if (value && value.format('HH:mm:ss') !== props.value)
    emit('change', value)
}

function confirm() {
  if (!text.value && open.value)
    text.value = '00:00:00'
  apply()
  input.value?.focus({ preventScroll: true })
}

function cancel() {
  close()
  input.value?.focus({ preventScroll: true })
}

useEventListener(root, 'keydown', (event) => {
  if (open.value && event.key === 'Escape') {
    event.stopPropagation()
    event.preventDefault()
    cancel()
  }
})

function leave(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !root.value?.contains(event.relatedTarget))
    apply()
}
onClickOutside(root, apply)
</script>

<template>
  <div ref="root" class="relative flex min-w-32! flex-1 items-center gap-2" :class="getInputClasses('small', disabled, false, { open, trailing: true })" @focusout="leave">
    <input
      ref="input" v-model="text" class="tabular-nums" :class="inputFieldClass" :aria-label="label" :aria-expanded="open" :aria-controls="open ? id : undefined"
      aria-haspopup="dialog" :placeholder="label" :disabled="disabled" :readonly="locked || !editable" autocomplete="off" maxlength="8"
      @click="openField" @focus="openField" @keydown.down.prevent="focusWheel" @keydown.enter.prevent="confirm"
    >
    <button
      type="button" :disabled="disabled || locked" :aria-label="label" :aria-expanded="open" :aria-controls="open ? id : undefined" aria-haspopup="dialog"
      class="inline-grid size-(--field-row) shrink-0 place-items-center rounded-z-sm border-0 bg-transparent text-z-text-secondary outline-none hover:text-z-primary focus-visible:ring-2 focus-visible:ring-z-control-outline"
      @click="open ? confirm() : focusWheel()"
    >
      <Clock :size="14" />
    </button>
    <div
      v-if="open" :id="id" ref="panel" role="dialog" :aria-label="label"
      class="absolute bottom-full z-10 mb-1 w-44 rounded-z-lg bg-z-bg-elevated p-1.5 shadow-z-popover" :class="alignEnd ? 'inset-e-0' : 'inset-s-0'"
    >
      <div class="relative flex">
        <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 rounded-z-sm bg-z-control-item-bg-active" />
        <DatePickerTimeColumn
          v-for="(unit, index) in units" :key="unit" :label="labels.of(unit)!"
          :count="unit === 'hour' ? 24 : 60" :value="parts[index]!" @select="select(index, $event)" @keydown.enter.prevent="confirm"
        />
      </div>
      <div class="mt-1 flex justify-end gap-1">
        <Button variant="text" size="small" @click="cancel">
          {{ locale.common.cancel }}
        </Button>
        <Button variant="text" type="primary" size="small" @click="confirm">
          {{ locale.common.confirm }}
        </Button>
      </div>
    </div>
  </div>
</template>
