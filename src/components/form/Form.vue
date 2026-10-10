<script setup lang="ts">
import type { FormFieldInstance } from './context'
import type { FormRules } from './types'
import { computed, provide } from 'vue'
import { formKey } from './context'

const props = defineProps<{ model?: object, rules?: FormRules }>()
defineSlots<{ default: () => unknown }>()

const fields = new Set<FormFieldInstance>()

function selectedFields(paths?: string | string[]) {
  const keys = paths === undefined ? undefined : Array.isArray(paths) ? paths : [paths]
  return [...fields].filter(field => keys === undefined || (field.prop.value && keys.includes(field.prop.value)))
}
async function validateField(paths?: string | string[]) {
  const results = await Promise.all(selectedFields(paths).map(field => field.validate()))
  return results.every(Boolean)
}
function clearValidate(paths?: string | string[]) {
  selectedFields(paths).forEach(field => field.clearValidate())
}
function scrollToField(path: string) {
  selectedFields(path)[0]?.scrollIntoView()
}
function focusField(path: string) {
  selectedFields(path)[0]?.focus()
}
const instance = { validate: () => validateField(), validateField, clearValidate, scrollToField, focusField }

provide(formKey, {
  ...instance,
  model: computed(() => props.model ?? {}),
  rules: computed(() => props.rules ?? {}),
  register(field) {
    fields.add(field)
    return () => fields.delete(field)
  },
})
defineExpose(instance)
</script>

<template>
  <form class="grid min-w-0 gap-5" @submit.prevent>
    <slot />
  </form>
</template>
