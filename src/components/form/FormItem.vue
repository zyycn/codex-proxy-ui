<script setup lang="ts">
import type { FormValidationTrigger } from './types'
import { computed, inject, onBeforeUnmount, provide, shallowRef, useId, useTemplateRef } from 'vue'
import { useLocale } from '../../locale/context'
import { formFieldKey, formKey } from './context'

const props = withDefaults(
  defineProps<{
    label?: string
    description?: string
    error?: string
    required?: boolean
    for?: string
    prop?: string
  }>(),
  {
    label: undefined,
    description: undefined,
    error: undefined,
    required: false,
    for: undefined,
  },
)

const slots = defineSlots<{ 'default': () => unknown, 'label'?: () => unknown, 'label-extra'?: () => unknown, 'extra'?: () => unknown }>()

const locale = useLocale()

const generatedId = useId()
const providedControlId = shallowRef<string>()
const rootRef = useTemplateRef<HTMLElement>('root')
const form = inject(formKey, null)
const validationError = shallowRef<string | (() => string)>('')
const errorMessage = computed(() => props.error || (typeof validationError.value === 'function' ? validationError.value() : validationError.value))
const rules = computed(() => {
  const rules = props.prop ? form?.rules.value[props.prop] : undefined
  return rules ? Array.isArray(rules) ? rules : [rules] : []
})
const isRequired = computed(() => props.required || rules.value.some(rule => rule.required))
const resolvedControlId = computed(() => props.for ?? providedControlId.value ?? `field-${generatedId}`)
const descriptionId = computed(() => (props.description ? `${resolvedControlId.value}-description` : undefined))
const errorId = computed(() => (errorMessage.value ? `${resolvedControlId.value}-error` : undefined))
const describedBy = computed(() => [descriptionId.value, errorId.value].filter(Boolean).join(' ') || undefined)

let validationSequence = 0
async function validate(trigger?: FormValidationTrigger) {
  const selectedRules = rules.value.filter(rule => !trigger || !rule.trigger || (Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]).includes(trigger))
  if (!selectedRules.length)
    return !errorMessage.value
  const sequence = ++validationSequence
  const model = form?.model.value ?? {}
  const value = props.prop?.split('.').reduce<unknown>((value, key) => value && typeof value === 'object' ? (value as Record<string, unknown>)[key] : undefined, model)
  let error: string | (() => string) = ''
  for (const rule of selectedRules) {
    if (rule.required && (value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length))) {
      error = rule.message ?? (() => locale.value.form.requiredMessage)
      break
    }
    if (rule.validator) {
      try {
        error = await rule.validator(value, model) || ''
      }
      catch (cause) {
        error = rule.message ?? (cause instanceof Error ? cause.message : () => locale.value.form.invalidMessage)
      }
      if (error)
        break
    }
  }
  // 清空、卸载或后一次校验会使当前异步结果失效
  if (sequence !== validationSequence)
    return false
  validationError.value = error
  return !errorMessage.value
}
function clearValidate() {
  validationSequence++
  validationError.value = ''
}
function focus() {
  const root = rootRef.value
  const control = root && [...root.querySelectorAll<HTMLElement>('[id]')].find(element => element.id === resolvedControlId.value)
  const target = control?.querySelector<HTMLElement>('[tabindex="0"]') ?? control
  target?.focus()
}
function scrollIntoView() {
  rootRef.value?.scrollIntoView({ block: 'nearest' })
}
const unregister = form?.register({ prop: computed(() => props.prop), validate, clearValidate, focus, scrollIntoView })
onBeforeUnmount(() => {
  clearValidate()
  unregister?.()
})
defineExpose({ validate, clearValidate, focus, scrollIntoView })
provide(formFieldKey, {
  controlId: resolvedControlId,
  labelledBy: computed(() => props.label || slots.label ? `${resolvedControlId.value}-label` : undefined),
  describedBy,
  invalid: computed(() => Boolean(errorMessage.value)),
  required: isRequired,
  validate,
  setControlId(id) { providedControlId.value = id },
})
</script>

<template>
  <div ref="root" class="relative min-w-0">
    <div v-if="label || $slots.label || $slots.extra" class="mb-2 flex min-h-4 min-w-0 items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-1.5">
        <!-- 控件 ID 由表单上下文提供，帮助按钮放在 label 外以免触发关联控件。 -->
        <!-- eslint-disable-next-line vue-a11y/label-has-for -->
        <label
          :id="`${resolvedControlId}-label`"
          :for="resolvedControlId"
          class="flex min-w-0 items-center gap-1.5 text-cp leading-none font-medium text-cp-text-secondary"
        >
          <slot name="label">{{ label }}</slot>
          <span v-if="isRequired" class="font-bold text-cp-error">*</span>
          <span v-if="isRequired" class="sr-only">{{ locale.form.required }}</span>
        </label>
        <slot name="label-extra" />
      </div>
      <div v-if="$slots.extra" class="inline-flex shrink-0 items-center">
        <slot name="extra" />
      </div>
    </div>
    <p
      v-if="description"
      :id="descriptionId"
      class="mt-0 mb-2 text-xs leading-[1.35] font-emphasis text-cp-text-quaternary"
    >
      {{ description }}
    </p>
    <div class="min-w-0">
      <slot />
    </div>
    <p
      v-if="errorMessage"
      :id="errorId"
      :title="errorMessage"
      class="absolute top-full left-0 mt-1 mb-0 max-w-full truncate text-xs leading-none font-emphasis text-cp-error-text"
      aria-live="polite"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
