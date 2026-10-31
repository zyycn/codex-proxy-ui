<script setup lang="ts">
import type { DatePickerType, DatePickerValue } from '@codex-proxy/ui'
import { ZCheckbox, ZDatePicker, ZFormItem, ZSelect } from '@codex-proxy/ui'
import { computed, ref, watch } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const type = ref<DatePickerType>('date')
const value = ref<DatePickerValue>('2026-10-17')
const disabled = ref(false)
const readonly = ref(false)
const editable = ref(true)
const clearable = ref(true)
const showShortcuts = ref(true)
const disableWeekends = ref(false)
const unlinkPanels = ref(false)
const singlePanel = ref(false)
const range = computed(() => type.value.endsWith('range'))
const options = [
  { label: '日期', value: 'date' },
  { label: '多日期', value: 'dates' },
  { label: '周', value: 'week' },
  { label: '月份', value: 'month' },
  { label: '多月份', value: 'months' },
  { label: '年份', value: 'year' },
  { label: '多年份', value: 'years' },
  { label: '季度', value: 'quarter' },
  { label: '多季度', value: 'quarters' },
  { label: '日期时间', value: 'datetime' },
  { label: '日期范围', value: 'daterange' },
  { label: '日期时间范围', value: 'datetimerange' },
  { label: '月份范围', value: 'monthrange' },
  { label: '年份范围', value: 'yearrange' },
  { label: '季度范围', value: 'quarterrange' },
] satisfies { label: string, value: DatePickerType }[]
const valueFormat = computed(() => type.value.includes('time') ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')
const shortcuts = computed(() => !showShortcuts.value
  ? []
  : range.value
    ? [{ text: '最近七天', value: () => [new Date(Date.now() - 6 * 86400000), new Date()] }]
    : [{ text: '今天', value: () => new Date() }])
const disabledDate = (date: Date) => disableWeekends.value && (date.getDay() === 0 || date.getDay() === 6)
watch(type, () => value.value = null)
</script>

<template>
  <DemoPlayground>
    <div class="grid w-full gap-4">
      <ZFormItem label="日期">
        <ZDatePicker v-model="value" :type="type" :value-format="valueFormat" :disabled="disabled" :readonly="readonly" :editable="editable" :clearable="clearable" :disabled-date="disabledDate" :shortcuts="shortcuts" :unlink-panels="unlinkPanels" :single-panel="singlePanel" :default-value="new Date(2026, 9, 1)" />
      </ZFormItem>
      <output class="break-all font-mono text-z-xs text-z-text-secondary" aria-label="绑定值">{{ JSON.stringify(value) }}</output>
    </div>
    <template #controls>
      <div class="demo-control">
        <span>类型</span>
        <ZSelect v-model="type" :options="options" size="small" class="w-40" aria-label="日期选择类型" />
      </div>
      <ZCheckbox v-model="disabled" label="禁用" />
      <ZCheckbox v-model="readonly" label="只读" />
      <ZCheckbox v-model="editable" label="可输入" />
      <ZCheckbox v-model="clearable" label="可清空" />
      <ZCheckbox v-model="showShortcuts" label="快捷选项" />
      <ZCheckbox v-model="disableWeekends" label="禁用周末" />
      <ZCheckbox v-if="range" v-model="unlinkPanels" label="独立面板" />
      <ZCheckbox v-if="range" v-model="singlePanel" label="单面板" />
    </template>
  </DemoPlayground>
</template>
