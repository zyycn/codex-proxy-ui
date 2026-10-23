import type { Dayjs } from 'dayjs'
import type { DatePickerDate, DatePickerType, DatePickerValue, DatePickerView } from '../types'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/zh-tw'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(localeData)
dayjs.extend(quarterOfYear)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

export { dayjs }

export const calendarLocales = { 'en': 'en', 'zh-Hans': 'zh-cn', 'zh-Hant': 'zh-tw' } as const

export function pickerView(type: DatePickerType): DatePickerView {
  if (type.startsWith('year'))
    return 'year'
  if (type.startsWith('month'))
    return 'month'
  if (type.startsWith('quarter'))
    return 'quarter'
  return 'date'
}

export function pickerFormat(type: DatePickerType, weekFormat: string) {
  if (type.includes('time'))
    return 'YYYY-MM-DD HH:mm:ss'
  if (type === 'week')
    return weekFormat
  return { date: 'YYYY-MM-DD', month: 'YYYY-MM', year: 'YYYY', quarter: 'YYYY-[Q]Q' }[pickerView(type)]
}

export function parseDate(value: DatePickerDate, format: string | undefined, locale: string): Dayjs | undefined {
  if (value === '')
    return undefined
  if (format && typeof value === 'string' && /w/.test(format.replace(/\[[^\]]*\]/g, '')))
    return parseWeek(value, format, locale)
  const parsed = format === 'x'
    ? dayjs(Number(value))
    : format && typeof value === 'string'
      ? dayjs(value, format, locale, true)
      : dayjs(value)
  return parsed.isValid() ? parsed.locale(locale) : undefined
}

function parseWeek(value: string, format: string, locale: string): Dayjs | undefined {
  const tokens = format.match(/\[[^\]]*\]|gggg|YYYY|ww|w|./g) ?? []
  const parts: string[] = []
  const pattern = tokens.map((token) => {
    if (['gggg', 'YYYY', 'ww', 'w'].includes(token)) {
      parts.push(token)
      return token.length === 4 ? '(\\d{4})' : token === 'ww' ? '(\\d{2})' : '(\\d{1,2})'
    }
    return token.replace(/^\[|\]$/g, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }).join('')
  const match = new RegExp(`^${pattern}$`).exec(value)
  if (!match)
    return undefined
  const yearIndex = parts.findIndex(part => part === 'gggg' || part === 'YYYY')
  const weekIndex = parts.findIndex(part => part === 'ww' || part === 'w')
  const year = yearIndex < 0 ? dayjs().locale(locale).weekYear() : Number(match[yearIndex + 1])
  const week = Number(match[weekIndex + 1])
  if (week < 1 || week > 53)
    return undefined
  // 周年可能跨日历年，不能让 customParseFormat 把 gggg 当成当前年份
  let first = dayjs(`${year}-01-01`).locale(locale).startOf('week')
  if (first.weekYear() < year)
    first = first.add(1, 'week')
  const start = first.add(week - 1, 'week')
  for (let index = 0; index < 7; index++) {
    const date = start.add(index, 'day')
    if (date.format(format) === value)
      return date
  }
  return undefined
}

export function parseValue(value: DatePickerValue, format: string | undefined, locale: string): Dayjs[] {
  if (value === null || value === undefined || value === '')
    return []
  const values = Array.isArray(value) ? value : [value]
  const dates = values.map(item => parseDate(item, format, locale))
  return dates.every((date): date is Dayjs => Boolean(date)) ? dates : []
}

export function formatValue(date: Dayjs, format?: string): DatePickerDate {
  return format === 'x' ? date.valueOf() : format ? date.format(format) : date.toDate()
}

export function sameValue(left: DatePickerValue, right: DatePickerValue): boolean {
  if (Array.isArray(left) && Array.isArray(right))
    return left.length === right.length && left.every((value, index) => sameValue(value, right[index]))
  return left instanceof Date && right instanceof Date ? left.getTime() === right.getTime() : left === right
}

export function startOfView(date: Dayjs, view: DatePickerView) {
  return date.startOf(view === 'date' ? 'day' : view)
}

// 月、季、年单元格只在整个周期均不可选时禁用，选取周期内首个可用日期
export function availableDate(date: Dayjs, view: DatePickerView, disabledDate?: (date: Date) => boolean): Dayjs | undefined {
  const start = startOfView(date, view)
  if (!disabledDate)
    return start
  const end = start.endOf(view === 'date' ? 'day' : view)
  for (let current = start; !current.isAfter(end); current = current.add(1, 'day')) {
    if (!disabledDate(current.toDate()))
      return current
  }
  return undefined
}

export function withTime(date: Dayjs, time?: Date | Dayjs) {
  const source = time ? dayjs(time) : undefined
  return source?.isValid() ? date.hour(source.hour()).minute(source.minute()).second(source.second()).millisecond(0) : date.startOf('day')
}
