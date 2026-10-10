import type { useAttrs } from 'vue'
import type { FormValidationTrigger } from '../types'
import { computed, inject, onBeforeUnmount, watch } from 'vue'
import { formFieldKey } from '../context'

export function useFormField(attrs: ReturnType<typeof useAttrs>, fallbackId?: string) {
  const field = inject(formFieldKey, null)
  watch(() => attrs.id, id => field?.setControlId(typeof id === 'string' ? id : undefined), { immediate: true })
  onBeforeUnmount(() => field?.setControlId(undefined))
  const labelledBy = computed(() => field?.labelledBy.value)
  const controlId = computed(() => typeof attrs.id === 'string'
    ? attrs.id
    : (field?.controlId.value ?? fallbackId))
  const invalid = computed(() => Boolean(
    field?.invalid.value || attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true',
  ))
  const describedBy = computed(() => [
    typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined,
    field?.describedBy.value,
  ].filter(Boolean).join(' ') || undefined)
  const required = computed(() => Boolean(field?.required.value || attrs.required === '' || attrs.required))
  const ariaRequired = computed(() => attrs['aria-required'] === undefined
    ? required.value || undefined
    : attrs['aria-required'] === true || attrs['aria-required'] === 'true')
  const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
  const controlAttrs = computed(() => Object.fromEntries(Object.entries(attrs).filter(([key]) => ![
    'class',
    'style',
    'id',
    'aria-describedby',
    'aria-invalid',
    'required',
    'aria-required',
  ].includes(key))))

  const validate = (trigger: FormValidationTrigger) => {
    void field?.validate(trigger)
  }
  return { controlId, labelledBy, invalid, describedBy, required, ariaRequired, rootAttrs, controlAttrs, validate }
}
