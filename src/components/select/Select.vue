<script setup lang="ts" generic="Multiple extends boolean = false, Value extends string | number = string">
import type { SelectEmits, SelectOption, SelectProps, SelectSize, SelectSlots, SelectValue } from './types'
import { Check, ChevronDown, LoaderCircle, X } from '@lucide/vue'
import { computed, provide, useAttrs, useTemplateRef, watch } from 'vue'
import { clearButtonClass } from '../../shared/utils/clear-button'
import Empty from '../empty/Empty.vue'
import { useFormField } from '../form/composables/useFormField'
import { formFieldKey } from '../form/context'
import Input from '../input/Input.vue'
import Scrollbar from '../scrollbar/Scrollbar.vue'
import SelectTags from './components/SelectTags.vue'
import { useSelect } from './composables/useSelect'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<SelectProps<Multiple, Value>>(),
  {
    size: 'default',
    disabled: false,
    placeholder: '请选择',
    emptyText: '暂无选项',
    maxCollapseTags: 1,
  },
)

const emit = defineEmits<SelectEmits<Multiple, Value>>()
defineSlots<SelectSlots<Value>>()
const model = defineModel<SelectValue<Multiple, Value>>({ required: true })
const attrs = useAttrs()
const rootRef = useTemplateRef<HTMLElement>('rootRef')
const triggerRef = useTemplateRef<HTMLButtonElement>('triggerRef')
const controlRef = useTemplateRef<HTMLElement>('controlRef')
const searchInputRef = useTemplateRef<InstanceType<typeof Input>>('searchInput')
const searchRef = useTemplateRef<HTMLElement>('searchRef')
const popoverRef = useTemplateRef<HTMLElement>('popoverRef')
const listboxRef = useTemplateRef<HTMLElement>('listboxRef')
const scrollbarRef = useTemplateRef<InstanceType<typeof Scrollbar>>('scrollbarRef')
const { controlId, invalid, describedBy, ariaRequired, validate } = useFormField(attrs)
const {
  selectId,
  open,
  search,
  activeIndex,
  popoverStyle,
  popoverMaxHeight,
  selectedValues,
  selectedOptions,
  selectionLabel,
  displayed,
  selectedOption,
  optionId,
  toggleMenu,
  openMenu,
  closeMenu,
  handleTriggerKeydown,
  removeOption,
  handleOptionFocus,
  chooseOption,
  handleEscape,
} = useSelect(props, model, { rootRef, triggerRef, controlRef, searchRef, searchInputRef, popoverRef, listboxRef, scrollbarRef }, {
  change(value) {
    emit('change', value)
    validate('change')
  },
  removeTag(value) {
    emit('removeTag', value)
  },
})
// 搜索和标签操作属于内部辅助控件，不继承选择字段的身份与校验状态
provide(formFieldKey, null)
const rootAttrs = computed(() => ({ class: attrs.class, style: attrs.style }))
const triggerAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(
      ([key]) => !['class', 'style', 'id', 'aria-describedby', 'aria-invalid', 'aria-required'].includes(key),
    ),
  ),
)

const sizeConfig: Record<
  SelectSize,
  {
    trigger: string
    multiple: string
    option: string
    icon: number
  }
> = {
  default: {
    trigger: 'h-cp-control px-3.5 pr-9 text-cp rounded-cp',
    multiple: 'min-h-cp-control py-0.5 pl-2 pr-9 text-cp rounded-cp',
    option: 'h-8.5 px-3 text-cp',
    icon: 16,
  },
  small: {
    trigger: 'h-cp-control-sm px-2.5 pr-7 text-xs rounded-cp',
    multiple: 'min-h-cp-control-sm py-0 pl-1.5 pr-7 text-xs rounded-cp',
    option: 'h-8 px-2.5 text-xs',
    icon: 14,
  },
  large: {
    trigger: 'h-cp-control-lg px-4 pr-10 text-cp-lg rounded-cp',
    multiple: 'min-h-cp-control-lg py-1 pl-2.5 pr-10 text-cp-lg rounded-cp',
    option: 'h-10 px-3.5 text-cp-lg',
    icon: 17,
  },
}

const triggerClasses = computed(() => [
  'relative inline-flex w-full min-w-0 items-center gap-2 overflow-visible border-0 text-left font-emphasis leading-none shadow-cp-input outline-none transition-[background-color,box-shadow,color] duration-160',
  props.multiple ? sizeConfig[props.size].multiple : sizeConfig[props.size].trigger,
  props.clearable && selectedValues.value.length && !props.disabled ? 'pr-15!' : undefined,
  props.disabled
    ? 'cursor-not-allowed bg-cp-bg-container-disabled text-cp-text-disabled shadow-none'
    : invalid.value
      ? [
          'cursor-pointer bg-cp-error-container text-cp-error-on-container',
          open.value
            ? 'bg-(--cp-input-error-active-bg) shadow-cp-input-error-active'
            : 'hover:not-focus-within:bg-(--cp-input-error-active-bg) hover:not-focus-within:shadow-cp-input-error-active focus-within:bg-(--cp-input-error-active-bg) focus-within:shadow-cp-input-error-active',
        ]
      : open.value
        ? 'cursor-pointer bg-(--cp-input-active-bg) text-cp-text shadow-cp-input-active'
        : [
            'cursor-pointer bg-(--cp-input-bg) text-cp-text',
            'hover:not-focus-within:bg-(--cp-input-hover-bg) hover:not-focus-within:shadow-cp-input-hover',
            'focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
          ],
])

function optionClasses(option: SelectOption<Value>, index: number) {
  return [
    'flex w-full shrink-0 touch-manipulation items-center gap-2 rounded-cp-sm border-0 px-3 text-left font-emphasis leading-none outline-none transition-colors motion-reduce:transition-none',
    sizeConfig[props.size].option,
    option.disabled
      ? 'cursor-not-allowed bg-transparent text-cp-text-disabled'
      : selectedValues.value.includes(option.value)
        ? 'cursor-pointer bg-cp-control-item-bg-active text-cp-primary-text'
        : activeIndex.value === index
          ? 'cursor-pointer bg-cp-bg-text-hover text-cp-text'
          : 'cursor-pointer bg-transparent text-cp-text hover:bg-cp-bg-text-hover',
  ]
}
watch(open, visible => emit('visibleChange', visible))
function clear() {
  const value = (props.multiple ? [] : undefined) as SelectValue<Multiple, Value>
  model.value = value
  emit('change', value)
  emit('clear')
  validate('change')
  triggerRef.value?.focus()
}
defineExpose({ focus: () => triggerRef.value?.focus(), blur: () => triggerRef.value?.blur(), clear, open: openMenu, close: closeMenu })
</script>

<template>
  <div ref="rootRef" class="z-select relative inline-block min-w-0 text-left" v-bind="rootAttrs">
    <div ref="controlRef" class="group/select relative" :class="multiple ? triggerClasses : undefined" :style="{ anchorName: `--${selectId}` }">
      <button
        v-bind="triggerAttrs"
        :id="controlId"
        ref="triggerRef"
        type="button"
        :class="multiple ? 'absolute inset-0 size-full rounded-cp border-0 bg-transparent p-0 text-inherit outline-none disabled:cursor-not-allowed' : triggerClasses"
        :disabled="disabled"
        role="combobox"
        :aria-expanded="open"
        :aria-controls="`${selectId}-listbox`"
        :aria-activedescendant="open && activeIndex >= 0 ? optionId(activeIndex) : undefined"
        :aria-describedby="describedBy"
        :aria-invalid="invalid || undefined"
        :aria-required="ariaRequired"
        @click="toggleMenu"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event); validate('blur')"
        @keydown="handleTriggerKeydown"
      >
        <span v-if="multiple" :class="selectedOptions.length ? 'sr-only' : 'block px-3 text-left text-cp-text-quaternary'">{{ selectionLabel || placeholder }}</span>
        <span v-else class="min-w-0 truncate" :class="selectedOption?.description ? 'max-w-1/2 shrink-0' : 'flex-1'">
          {{ selectedOption?.label ?? placeholder }}
        </span>
        <span
          v-if="!multiple && selectedOption?.description"
          :title="selectedOption.description"
          class="min-w-0 flex-1 truncate font-normal"
          :class="disabled ? 'text-cp-text-disabled' : 'text-cp-text-tertiary'"
        >
          {{ selectedOption.description }}
        </span>
        <ChevronDown
          class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transition-transform"
          :class="
            disabled ? 'text-cp-text-disabled' : open ? 'rotate-180 text-cp-primary-text' : 'text-cp-text-quaternary'
          "
          :size="sizeConfig[size].icon"
        />
      </button>
      <button
        v-if="clearable && selectedValues.length && !disabled"
        type="button"
        aria-label="清空选择"
        :class="clearButtonClass"
        class="pointer-events-none absolute top-1/2 right-8 z-10 -translate-y-1/2 opacity-0 group-focus-within/select:pointer-events-auto group-focus-within/select:opacity-100 group-hover/select:pointer-events-auto group-hover/select:opacity-100"
        @mousedown.prevent
        @click.stop="clear"
      >
        <X :size="14" />
      </button>
      <SelectTags
        v-if="multiple && selectedOptions.length"
        class="relative min-w-0 flex-1"
        :options="selectedOptions"
        :size="size === 'small' ? 'small' : 'default'"
        :disabled="disabled"
        :collapse="collapseTags"
        :tooltip="collapseTagsTooltip"
        :limit="maxCollapseTags"
        :menu-open="open"
        @remove="removeOption"
        @focus-control="triggerRef?.focus()"
      />
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none"
        enter-from-class="-translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in motion-reduce:transition-none"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          ref="popoverRef"
          data-cp-overlay
          class="fixed z-50 rounded-cp-lg border-0 bg-cp-bg-elevated shadow-cp"
          :style="popoverStyle"
        >
          <div v-if="filterable" ref="searchRef" class="p-2">
            <Input
              :id="`${selectId}-search`"
              ref="searchInput"
              v-model="search"
              size="small"
              aria-label="搜索选项"
              placeholder="输入名称筛选"
              role="combobox"
              aria-expanded="true"
              :aria-controls="`${selectId}-listbox`"
              :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined"
              @input="emit('queryChange', $event)"
              @keydown="handleTriggerKeydown"
            />
          </div>
          <Scrollbar ref="scrollbarRef" :max-height="popoverMaxHeight" class="rounded-cp-lg">
            <div
              :id="`${selectId}-listbox`"
              ref="listboxRef"
              class="flex flex-col gap-1 p-1"
              role="listbox"
              :aria-labelledby="controlId"
              :aria-multiselectable="multiple || undefined"
              :aria-busy="loading || undefined"
            >
              <div v-if="displayed.length === 0" class="shrink-0">
                <slot name="empty" :search="search">
                  <Empty :title="loading ? '正在加载…' : search ? '没有匹配项' : emptyText" size="small" surface="none" role="status">
                    <template v-if="loading" #icon>
                      <LoaderCircle :size="18" class="animate-spin text-cp-text-quaternary motion-reduce:animate-none" />
                    </template>
                  </Empty>
                </slot>
              </div>

              <template v-else>
                <button
                  v-for="(option, index) in displayed"
                  :id="optionId(index)"
                  :key="option.value"
                  type="button"
                  role="option"
                  :aria-selected="selectedValues.includes(option.value)"
                  tabindex="-1"
                  :disabled="option.disabled"
                  :class="optionClasses(option, index)"
                  @mouseenter="activeIndex = option.disabled ? activeIndex : index"
                  @focus="handleOptionFocus(index)"
                  @mousedown.prevent
                  @click="chooseOption(option, index)"
                  @keydown.esc="handleEscape"
                >
                  <slot name="option" :option="option" :index="index" :selected="selectedValues.includes(option.value)" :disabled="Boolean(option.disabled)">
                    <span class="min-w-0 truncate" :class="option.description ? 'max-w-1/2 shrink-0' : 'flex-1'">{{ option.label }}</span>
                    <span
                      v-if="option.description"
                      :title="option.description"
                      class="min-w-0 flex-1 truncate font-normal"
                      :class="option.disabled ? 'text-cp-text-disabled' : 'text-cp-text-tertiary'"
                    >
                      {{ option.description }}
                    </span>
                  </slot>
                  <Check
                    v-if="selectedValues.includes(option.value)"
                    class="shrink-0 text-cp-primary-text"
                    :size="size === 'small' ? 13 : size === 'large' ? 17 : 15"
                  />
                </button>
              </template>
            </div>
          </Scrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
