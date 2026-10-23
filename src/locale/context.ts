import type { ComputedRef, InjectionKey, MaybeRefOrGetter } from 'vue'
import type { UiLocale } from './types'
import { computed, inject, toValue } from 'vue'
import en from './lang/en'

export const localeKey: InjectionKey<ComputedRef<UiLocale>> = Symbol('ui-locale')

export function useLocale(override?: MaybeRefOrGetter<UiLocale | undefined>) {
  const parent = inject(localeKey, undefined)
  return computed(() => toValue(override) ?? parent?.value ?? en)
}
