<script setup lang="ts">
import type { Dayjs } from 'dayjs'
import type { DatePickerCell, DatePickerSlots, DatePickerView } from '../types'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from '@lucide/vue'
import { computed, nextTick, shallowRef, useTemplateRef, watch } from 'vue'
import { useLocale } from '../../../locale/context'
import { availableDate, dayjs, startOfView } from '../utils/date'

const props = defineProps<{
  date: Dayjs
  view: DatePickerView
  selected: Dayjs[]
  range: boolean
  week: boolean
  selecting: boolean
  hover?: Dayjs
  disabledDate?: (date: Date) => boolean
  cellClassName?: (date: Date) => string
  showWeekNumber?: boolean
}>()

const emit = defineEmits<{
  pick: [date: Dayjs]
  cellHover: [date: Dayjs]
  navigate: [date: Dayjs, view: DatePickerView]
}>()

defineSlots<DatePickerSlots>()

const locale = useLocale()

const mode = shallowRef(props.view)
const focused = shallowRef<number>()
const grid = useTemplateRef<HTMLElement>('grid')
const columns = computed(() => mode.value === 'date' ? 7 : 4)
const decade = computed(() => Math.floor(props.date.year() / 10) * 10)
const weekdays = computed(() => {
  const locale = props.date.localeData()
  const days = locale.weekdaysMin()
  return Array.from({ length: 7 }, (_, index) => days[(index + locale.firstDayOfWeek()) % 7])
})
const bounds = computed(() => {
  if (!props.range || !props.selected[0])
    return []
  const end = props.selecting ? props.hover : props.selected[1]
  return end ? [props.selected[0], end].map(date => startOfView(date, mode.value)).sort((a, b) => a.valueOf() - b.valueOf()) : []
})
const cells = computed<DatePickerCell[]>(() => {
  const count = { date: 42, month: 12, quarter: 4, year: 10 }[mode.value]
  const first = mode.value === 'date' ? props.date.startOf('month').startOf('week') : props.date.startOf('year')
  return Array.from({ length: count }, (_, index) => {
    const date = mode.value === 'date'
      ? first.add(index, 'day')
      : mode.value === 'month'
        ? first.month(index)
        : mode.value === 'quarter' ? first.month(index * 3) : first.year(decade.value + index)
    const stamp = (value: Dayjs) => (props.week && mode.value === 'date' ? value.startOf('week') : startOfView(value, mode.value)).valueOf()
    const selected = props.selected.find(value => stamp(value) === stamp(date))
    const start = Boolean(bounds.value[0] && stamp(bounds.value[0]) === stamp(date))
    const end = Boolean(bounds.value[1] && stamp(bounds.value[1]) === stamp(date))
    const inRange = Boolean(bounds.value[0] && bounds.value[1] && stamp(date) >= stamp(bounds.value[0]) && stamp(date) <= stamp(bounds.value[1]))
    const today = dayjs().locale(props.date.locale())
    const text = mode.value === 'date' ? date.date() : mode.value === 'month' ? date.month() : mode.value === 'quarter' ? date.quarter() : date.year()
    return {
      row: Math.floor(index / columns.value),
      column: index % columns.value,
      text,
      renderText: mode.value === 'month' ? date.format('MMM') : mode.value === 'quarter' ? `Q${text}` : String(text),
      timestamp: date.valueOf(),
      date: date.toDate(),
      dayjs: date,
      type: mode.value === 'date' && !date.isSame(props.date, 'month') ? date.isBefore(props.date, 'month') ? 'prev-month' : 'next-month' : stamp(date) === stamp(today) ? 'today' : 'normal',
      disabled: !availableDate(date, mode.value, props.disabledDate),
      isCurrent: Boolean(selected),
      isSelected: Boolean(selected),
      selected,
      start,
      end,
      inRange,
      customClass: props.cellClassName?.(date.toDate()),
    }
  })
})
const rows = computed(() => Array.from({ length: Math.ceil(cells.value.length / columns.value) }, (_, index) => cells.value.slice(index * columns.value, (index + 1) * columns.value)))
const tabStop = computed(() => cells.value.find(cell => !cell.disabled && cell.timestamp === focused.value)
  ?? cells.value.find(cell => !cell.disabled && cell.isSelected)
  ?? cells.value.find(cell => !cell.disabled && cell.type === 'today')
  ?? cells.value.find(cell => !cell.disabled))
const actionClass = 'inline-flex size-7 shrink-0 items-center justify-center rounded-cp-sm border-0 bg-transparent p-0 text-cp-text-secondary outline-none hover:bg-cp-fill-tertiary hover:text-cp-primary focus-visible:ring-2 focus-visible:ring-cp-control-outline'

function navigate(amount: number, large = false) {
  const unit = mode.value === 'date' && !large ? 'month' : 'year'
  const step = mode.value === 'year' ? 10 : 1
  emit('navigate', props.date.add(amount * step, unit), mode.value)
}

function changeView(view: DatePickerView) {
  mode.value = view
  emit('navigate', props.date, view)
}

function choose(cell: DatePickerCell) {
  if (cell.disabled)
    return
  if (mode.value === props.view) {
    emit('pick', cell.dayjs)
    return
  }
  mode.value = mode.value === 'year' && props.view === 'date' ? 'month' : props.view
  emit('navigate', cell.dayjs, mode.value)
  void nextTick(focus)
}

async function keydown(event: KeyboardEvent, cell: DatePickerCell) {
  const deltas: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns.value, ArrowDown: columns.value, Home: -cell.column, End: columns.value - 1 - cell.column }
  const delta = deltas[event.key]
  if (delta === undefined && event.key !== 'PageUp' && event.key !== 'PageDown')
    return
  event.preventDefault()
  const unit = mode.value === 'date' ? 'day' : mode.value
  let date = event.key.startsWith('Page')
    ? cell.dayjs.add(event.key === 'PageUp' ? -1 : 1, mode.value === 'date' && !event.shiftKey ? 'month' : 'year')
    : cell.dayjs.add(delta!, unit)
  // 只跳过当前导航方向上的禁用日期，限制搜索以免全禁用回调造成无限循环
  for (let i = 0; i < 366 && !availableDate(date, mode.value, props.disabledDate); i++)
    date = date.add((delta ?? (event.key === 'PageUp' ? -1 : 1)) < 0 ? -1 : 1, unit)
  if (!availableDate(date, mode.value, props.disabledDate))
    return
  focused.value = date.valueOf()
  if (!cells.value.some(item => item.timestamp === focused.value))
    emit('navigate', date, mode.value)
  await nextTick()
  grid.value?.querySelector<HTMLButtonElement>(`[data-date="${focused.value}"]`)?.focus()
}

function focus() {
  grid.value?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus()
}
defineExpose({ focus })
watch(() => props.view, value => mode.value = value)
</script>

<template>
  <section class="w-72 max-w-full shrink-0 p-3">
    <div class="mb-3 flex items-center justify-between gap-1">
      <button type="button" :class="actionClass" :aria-label="locale.datePicker.previousYear" @click="navigate(-1, true)">
        <slot name="prev-year">
          <ChevronsLeft :size="16" />
        </slot>
      </button>
      <button v-if="mode === 'date'" type="button" :class="actionClass" :aria-label="locale.datePicker.previousMonth" @click="navigate(-1)">
        <slot name="prev-month">
          <ChevronLeft :size="16" />
        </slot>
      </button>
      <div class="flex flex-1 items-center justify-center gap-1 font-emphasis" aria-live="polite">
        <span v-if="mode === 'year'">{{ decade }} – {{ decade + 9 }}</span>
        <template v-else>
          <button type="button" class="rounded-cp-sm border-0 bg-transparent px-1 text-cp-text outline-none hover:text-cp-primary focus-visible:ring-2 focus-visible:ring-cp-control-outline" :aria-label="locale.datePicker.chooseYear" @click="changeView('year')">
            {{ date.format('YYYY') }}
          </button>
          <button v-if="mode === 'date'" type="button" class="rounded-cp-sm border-0 bg-transparent px-1 text-cp-text outline-none hover:text-cp-primary focus-visible:ring-2 focus-visible:ring-cp-control-outline" :aria-label="locale.datePicker.chooseMonth" @click="changeView('month')">
            {{ date.format('MMM') }}
          </button>
        </template>
      </div>
      <button v-if="mode === 'date'" type="button" :class="actionClass" :aria-label="locale.datePicker.nextMonth" @click="navigate(1)">
        <slot name="next-month">
          <ChevronRight :size="16" />
        </slot>
      </button>
      <button type="button" :class="actionClass" :aria-label="locale.datePicker.nextYear" @click="navigate(1, true)">
        <slot name="next-year">
          <ChevronsRight :size="16" />
        </slot>
      </button>
    </div>
    <div ref="grid" role="grid" :aria-label="mode === 'year' ? `${decade} – ${decade + 9}` : date.format('YYYY MMMM')" :aria-multiselectable="range || selected.length > 1">
      <div v-if="mode === 'date'" role="row" class="mb-1 grid text-center text-cp-xs text-cp-text-tertiary" :style="{ gridTemplateColumns: `repeat(${showWeekNumber ? 8 : 7}, minmax(0, 1fr))` }">
        <span v-if="showWeekNumber" role="columnheader" class="py-1">{{ locale.datePicker.week }}</span>
        <span v-for="(day, index) in weekdays" :key="index" role="columnheader" class="py-1">{{ day }}</span>
      </div>
      <div v-for="(row, index) in rows" :key="index" role="row" class="grid py-0.5" :style="{ gridTemplateColumns: `repeat(${columns + (mode === 'date' && showWeekNumber ? 1 : 0)}, minmax(0, 1fr))` }">
        <span v-if="mode === 'date' && showWeekNumber" role="rowheader" class="flex items-center justify-center text-cp-xs text-cp-text-quaternary">{{ row[0]?.dayjs.week() }}</span>
        <div v-for="cell in row" :key="cell.timestamp" role="gridcell" :aria-selected="cell.isSelected || cell.inRange" :aria-disabled="cell.disabled" :class="[cell.inRange && 'bg-cp-control-item-bg-active', cell.start && 'rounded-l-cp-sm', cell.end && 'rounded-r-cp-sm', cell.customClass]" class="flex items-center justify-center">
          <button
            type="button"
            :data-date="cell.timestamp"
            :tabindex="cell.timestamp === tabStop?.timestamp ? 0 : -1"
            :disabled="cell.disabled"
            :aria-label="cell.dayjs.format(mode === 'date' ? 'YYYY-MM-DD' : mode === 'month' ? 'YYYY-MM' : mode === 'year' ? 'YYYY' : 'YYYY-[Q]Q')"
            :aria-current="cell.type === 'today' ? 'date' : undefined"
            class="inline-flex items-center justify-center rounded-cp-sm border-0 bg-transparent p-0 text-cp-xs tabular-nums outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cp-control-outline disabled:cursor-not-allowed disabled:text-cp-text-disabled"
            :class="[
              mode === 'date' ? 'size-8' : 'my-1 h-10 w-full',
              cell.isSelected || cell.start || cell.end ? 'bg-cp-primary! font-emphasis text-white' : cell.type === 'today' ? 'font-emphasis text-cp-primary' : cell.type === 'prev-month' || cell.type === 'next-month' ? 'text-cp-text-quaternary' : 'text-cp-text',
              !cell.disabled && !cell.isSelected && !cell.start && !cell.end && 'hover:bg-cp-fill-secondary',
            ]"
            @click="choose(cell)"
            @mouseenter="emit('cellHover', cell.dayjs)"
            @focus="focused = cell.timestamp; emit('cellHover', cell.dayjs)"
            @keydown="keydown($event, cell)"
          >
            <slot v-bind="cell">
              {{ cell.renderText }}
            </slot>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
