import type { useAttrs } from 'vue'
import { computed, inject } from 'vue'
import { formFieldKey } from './context'

export function useFormField(attrs: ReturnType<typeof useAttrs>, fallbackId?: string) {
  const field = inject(formFieldKey, null)
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
  const required = computed(() => field?.required.value || undefined)

  return { controlId, invalid, describedBy, required }
}
