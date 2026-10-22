<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, useAttrs, useTemplateRef } from 'vue'
import { useLocale } from '../../locale/context'
import { useFormField } from '../form/composables/useFormField'

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    step?: number
    unit?: string
    disabled?: boolean
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    unit: undefined,
    disabled: false,
  },
)

const emit = defineEmits<{ input: [value: number], change: [value: number], focus: [event: FocusEvent], blur: [event: FocusEvent] }>()

const locale = useLocale()

const model = defineModel<number>({ required: true })
const attrs = useAttrs()
const inputRef = useTemplateRef<HTMLInputElement>('input')
const { controlId, describedBy, invalid, ariaRequired, validate } = useFormField(attrs)
defineExpose({ focus: () => inputRef.value?.focus(), blur: () => inputRef.value?.blur() })

const rangeStyle = computed<CSSProperties>(() => {
  const span = props.max - props.min
  const progress = span > 0 ? ((model.value - props.min) / span) * 100 : 0
  return {
    '--z-slider-progress': `${Math.min(100, Math.max(0, progress))}%`,
  }
})

const valueText = computed(() => `${model.value}${props.unit ?? ''}`)

function updateModel(event: Event) {
  const value = (event.target as HTMLInputElement).valueAsNumber
  if (Number.isFinite(value)) {
    model.value = value
    emit('input', value)
  }
}
</script>

<template>
  <input
    :id="controlId"
    ref="input"
    :value="model"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    :aria-label="typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : locale.common.value"
    :aria-describedby="describedBy"
    :aria-invalid="invalid || undefined"
    :aria-required="ariaRequired"
    :aria-valuetext="valueText"
    class="z-slider h-5 w-full"
    :style="rangeStyle"
    @input="updateModel"
    @change="emit('change', ($event.target as HTMLInputElement).valueAsNumber); validate('change')"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event); validate('blur')"
  >
</template>

<style scoped>
.z-slider {
  appearance: none;
  cursor: pointer;
  background: transparent;
  outline: none;
}

.z-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    to right,
    var(--cp-color-primary) 0 var(--z-slider-progress),
    var(--cp-color-fill-secondary) var(--z-slider-progress) 100%
  );
}

.z-slider::-webkit-slider-thumb {
  width: 14px;
  height: 14px;
  margin-top: -5px;
  appearance: none;
  border: 2px solid var(--cp-color-bg-container);
  border-radius: 999px;
  background: var(--cp-color-primary);
  transition:
    box-shadow 150ms ease,
    transform 150ms ease;
}

.z-slider::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: var(--cp-color-fill-secondary);
}

.z-slider::-moz-range-progress {
  height: 4px;
  border-radius: 999px;
  background: var(--cp-color-primary);
}

.z-slider::-moz-range-thumb {
  width: 10px;
  height: 10px;
  border: 2px solid var(--cp-color-bg-container);
  border-radius: 999px;
  background: var(--cp-color-primary);
  transition:
    box-shadow 150ms ease,
    transform 150ms ease;
}

.z-slider:hover::-webkit-slider-thumb {
  transform: scale(1.08);
}

.z-slider:hover::-moz-range-thumb {
  transform: scale(1.08);
}

.z-slider:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--cp-color-primary-container-hover);
}

.z-slider:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 3px var(--cp-color-primary-container-hover);
}

.z-slider:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

@media (prefers-reduced-motion: reduce) {
  .z-slider::-webkit-slider-thumb {
    transition: none;
  }

  .z-slider::-moz-range-thumb {
    transition: none;
  }
}
</style>
