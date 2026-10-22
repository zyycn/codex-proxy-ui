import type { Dayjs } from 'dayjs'
import type { Component, CSSProperties } from 'vue'
import type { UiLocale } from '../../locale/types'
import type { ComponentSize } from '../../shared/types'
import type { PopoverPlacement } from '../popover/types'

export type DatePickerType = 'date' | 'dates' | 'week' | 'month' | 'months' | 'year' | 'years' | 'quarter' | 'quarters' | 'datetime' | 'daterange' | 'datetimerange' | 'monthrange' | 'yearrange' | 'quarterrange'
export type DatePickerDate = Date | string | number
export type DatePickerValue = DatePickerDate | DatePickerDate[] | null | undefined
export type DatePickerView = 'date' | 'month' | 'year' | 'quarter'

export interface DatePickerShortcut {
  text: string
  value: Date | Date[] | (() => Date | Date[])
}

export interface DatePickerProps {
  type?: DatePickerType
  size?: ComponentSize
  disabled?: boolean
  readonly?: boolean
  editable?: boolean
  clearable?: boolean
  placeholder?: string
  startPlaceholder?: string
  endPlaceholder?: string
  format?: string
  valueFormat?: string
  rangeSeparator?: string
  defaultValue?: Date | [Date, Date]
  defaultTime?: Date | [Date, Date]
  disabledDate?: (date: Date) => boolean
  cellClassName?: (date: Date) => string
  shortcuts?: DatePickerShortcut[]
  unlinkPanels?: boolean
  singlePanel?: boolean
  showWeekNumber?: boolean
  showFooter?: boolean
  showConfirm?: boolean
  automaticDropdown?: boolean
  validateEvent?: boolean
  teleported?: boolean
  placement?: PopoverPlacement
  popperClass?: string
  popperStyle?: CSSProperties
  prefixIcon?: Component | string
  clearIcon?: Component | string
  valueOnClear?: DatePickerValue | (() => DatePickerValue)
  /** 覆盖组件语言包，不修改全局 Day.js locale */
  locale?: UiLocale
}

export interface DatePickerCell {
  row: number
  column: number
  text: number
  renderText: string
  timestamp: number
  date: Date
  dayjs: Dayjs
  type: 'normal' | 'today' | 'prev-month' | 'next-month'
  disabled: boolean
  isCurrent: boolean
  isSelected: boolean
  selected?: Dayjs
  start: boolean
  end: boolean
  inRange: boolean
  customClass?: string
}

export interface DatePickerEmits {
  change: [value: DatePickerValue]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  visibleChange: [visible: boolean]
  calendarChange: [dates: [Date | null, Date | null]]
  panelChange: [dates: Date | Date[], mode: DatePickerView, view: DatePickerView]
}

export interface DatePickerSlots {
  'default'?: (cell: DatePickerCell) => unknown
  'range-separator'?: () => unknown
  'prev-month'?: () => unknown
  'next-month'?: () => unknown
  'prev-year'?: () => unknown
  'next-year'?: () => unknown
}

export interface DatePickerInstance {
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
}
