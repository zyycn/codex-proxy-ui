<script setup lang="ts" generic="Multiple extends boolean = false">
import type { CSSProperties } from 'vue'
import type { SelectOption } from './types'

import { Check, ChevronDown, LoaderCircle } from '@lucide/vue'
import { onClickOutside, useEventListener, useResizeObserver } from '@vueuse/core'
import { clamp } from 'es-toolkit'
import { computed, inject, nextTick, ref, useAttrs, useId, watch } from 'vue'
import BaseEmpty from '../empty/BaseEmpty.vue'
import { formFieldKey } from '../form/context'
import BaseInput from '../input/BaseInput.vue'
import BaseScrollbar from '../scrollbar/BaseScrollbar.vue'
import BaseSelectTags from './BaseSelectTags.vue'

type SelectSize = 'sm' | 'md' | 'lg'
type SelectValue<M extends boolean> = M extends true ? string[] : string

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    options: SelectOption[]
    size?: SelectSize
    disabled?: boolean
    placeholder?: string
    emptyText?: string
    multiple?: Multiple & boolean
    filterable?: boolean
    collapseTags?: boolean
    collapseTagsTooltip?: boolean
    maxCollapseTags?: number
    loading?: boolean
  }>(),
  {
    size: 'md',
    disabled: false,
    placeholder: '请选择',
    emptyText: '暂无选项',
    maxCollapseTags: 1,
  },
)

const model = defineModel<SelectValue<Multiple>>({ required: true })
const attrs = useAttrs()
const field = inject(formFieldKey, null)

const rootRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const controlRef = ref<HTMLElement | null>(null)
const searchRef = ref<HTMLElement | null>(null)
const search = ref('')
const popoverRef = ref<HTMLElement | null>(null)
const listboxRef = ref<HTMLElement | null>(null)
const scrollbarRef = ref<InstanceType<typeof BaseScrollbar> | null>(null)
const open = ref(false)
const activeIndex = ref(-1)
const popoverStyle = ref<CSSProperties>({})
const popoverMaxHeight = ref('244px')
const selectId = `base-select-${useId()}`
const controlId = computed(() => (typeof attrs.id === 'string' ? attrs.id : (field?.controlId.value ?? selectId)))
const invalid = computed(() =>
  Boolean(field?.invalid.value || attrs['aria-invalid'] === true || attrs['aria-invalid'] === 'true'),
)
const describedBy = computed(
  () =>
    [typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined, field?.describedBy.value]
      .filter(Boolean)
      .join(' ') || undefined,
)
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
  md: {
    trigger: 'h-cp-control px-3.5 pr-9 text-cp rounded-cp',
    multiple: 'min-h-cp-control py-1.5 pl-2 pr-9 text-cp rounded-cp',
    option: 'h-8.5 px-3 text-cp',
    icon: 16,
  },
  sm: {
    trigger: 'h-cp-control-sm px-2.5 pr-7 text-xs rounded-cp',
    multiple: 'min-h-cp-control-sm py-1 pl-1.5 pr-7 text-xs rounded-cp',
    option: 'h-8 px-2.5 text-xs',
    icon: 14,
  },
  lg: {
    trigger: 'h-cp-control-lg px-4 pr-10 text-cp-lg rounded-cp',
    multiple: 'min-h-cp-control-lg py-2 pl-2.5 pr-10 text-cp-lg rounded-cp',
    option: 'h-10 px-3.5 text-cp-lg',
    icon: 17,
  },
}

const selectedValues = computed<string[]>(() => Array.isArray(model.value) ? model.value : [model.value])
const selectedOptions = computed(() => selectedValues.value.map(value => props.options.find(option => option.value === value) ?? { value, label: value }))
const selectionLabel = computed(() => selectedOptions.value.map(option => option.label).join('、'))
const displayed = computed(() => props.loading
  ? []
  : props.options.filter(option =>
      !props.filterable || `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()),
    ))
const selectedOption = computed(() => props.options.find(option => option.value === model.value))

const triggerClasses = computed(() => [
  'relative inline-flex w-full min-w-0 items-center gap-2 overflow-visible border-0 text-left font-emphasis leading-none shadow-cp-input outline-none transition-[background-color,box-shadow,color] duration-[160ms]',
  props.multiple ? sizeConfig[props.size].multiple : sizeConfig[props.size].trigger,
  props.disabled
    ? 'cursor-not-allowed bg-cp-bg-container-disabled text-cp-text-disabled shadow-none'
    : invalid.value
      ? 'cursor-pointer bg-(--cp-input-error-active-bg) text-cp-error-on-container shadow-cp-input-error-active'
      : open.value
        ? 'cursor-pointer bg-(--cp-input-active-bg) text-cp-text shadow-cp-input-active'
        : [
            'cursor-pointer bg-[var(--cp-input-bg)] text-cp-text',
            'hover:not-focus-within:bg-[var(--cp-input-hover-bg)] hover:not-focus-within:shadow-cp-input-hover',
            'focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
          ],
])

function optionId(index: number) {
  return `${selectId}-option-${index}`
}

function enabledIndexes() {
  return displayed.value.flatMap((option, index) => (option.disabled ? [] : [index]))
}

function selectedIndex() {
  return displayed.value.findIndex(option => selectedValues.value.includes(option.value))
}

function setActiveToSelected() {
  const selected = selectedIndex()
  if (selected >= 0 && !displayed.value[selected]?.disabled) {
    activeIndex.value = selected
    return
  }

  activeIndex.value = enabledIndexes()[0] ?? -1
}

function updatePopoverPosition() {
  if (!open.value || !controlRef.value || !listboxRef.value)
    return

  const rect = controlRef.value.getBoundingClientRect()
  const gap = 6
  const searchHeight = searchRef.value?.offsetHeight ?? 0
  const menuHeight = Math.min(listboxRef.value.scrollHeight, 244) + searchHeight
  const belowSpace = window.innerHeight - rect.bottom - gap - 8
  const aboveSpace = rect.top - gap - 8
  const placeAbove = belowSpace < menuHeight && aboveSpace > belowSpace
  const availableHeight = Math.max(placeAbove ? aboveSpace : belowSpace, 0)
  const maxHeight = Math.min(menuHeight, availableHeight)
  const top = placeAbove
    ? Math.max(8, rect.top - maxHeight - gap)
    : Math.min(rect.bottom + gap, window.innerHeight - maxHeight - 8)
  const left = clamp(rect.left, 8, window.innerWidth - rect.width - 8)

  // 原生锚点由浏览器随滚动合成，避免 body 浮层等待主线程坐标更新。
  const nativeAnchor = CSS.supports('top', 'anchor(bottom)')
  popoverMaxHeight.value = `${Math.max(0, maxHeight - searchHeight)}px`
  popoverStyle.value = {
    positionAnchor: nativeAnchor ? `--${selectId}` : undefined,
    positionVisibility: nativeAnchor ? 'anchors-visible' : undefined,
    left: nativeAnchor ? 'anchor(left)' : `${left}px`,
    top: nativeAnchor
      ? placeAbove ? `calc(anchor(top) - ${maxHeight + gap}px)` : `calc(anchor(bottom) + ${gap}px)`
      : `${top}px`,
    width: nativeAnchor ? 'anchor-size(width)' : `${rect.width}px`,
    maxWidth: 'calc(100vw - 16px)',
  }
}

function scrollActiveIntoView() {
  const wrap = scrollbarRef.value?.wrapRef
  const option = listboxRef.value?.children[activeIndex.value]
  if (!open.value || !wrap || !option)
    return

  // 只滚动菜单自身，避免键盘定位选项时带动弹窗或页面滚动。
  const wrapRect = wrap.getBoundingClientRect()
  const optionRect = option.getBoundingClientRect()
  if (optionRect.top < wrapRect.top)
    wrap.scrollTop -= wrapRect.top - optionRect.top
  else if (optionRect.bottom > wrapRect.bottom)
    wrap.scrollTop += optionRect.bottom - wrapRect.bottom
}

async function openMenu() {
  if (props.disabled || open.value)
    return

  search.value = ''
  open.value = true
  setActiveToSelected()
  await nextTick()
  updatePopoverPosition()
  await nextTick()
  scrollActiveIntoView()
  searchRef.value?.querySelector('input')?.focus()
}

function closeMenu() {
  open.value = false
}

function toggleMenu() {
  if (open.value) {
    closeMenu()
    return
  }

  void openMenu()
}

function moveActive(delta: number) {
  const indexes = enabledIndexes()
  if (indexes.length === 0)
    return

  const current = indexes.indexOf(activeIndex.value)
  const next = current === -1 ? (delta > 0 ? 0 : indexes.length - 1) : current + delta
  activeIndex.value = indexes[(next + indexes.length) % indexes.length]
  // 只有键盘导航主动定位；鼠标悬停不能把半露出的选项滚入视口。
  scrollActiveIntoView()
}

function handleOptionFocus(index: number) {
  const option = displayed.value[index]
  if (!option || option.disabled)
    return

  activeIndex.value = index
  scrollActiveIntoView()
}

function chooseOption(option: SelectOption, index: number) {
  if (props.disabled || option.disabled)
    return

  model.value = (props.multiple
    ? selectedValues.value.includes(option.value)
      ? selectedValues.value.filter(value => value !== option.value)
      : [...selectedValues.value, option.value]
    : option.value) as SelectValue<Multiple>
  activeIndex.value = index
  if (!props.multiple) {
    closeMenu()
    triggerRef.value?.focus()
  }
}

function chooseActive() {
  const option = displayed.value[activeIndex.value]
  if (!option)
    return

  chooseOption(option, activeIndex.value)
}

function removeOption(value: string) {
  if (props.disabled || props.options.find(option => option.value === value)?.disabled)
    return
  model.value = selectedValues.value.filter(item => item !== value) as SelectValue<Multiple>
}

function handleEscape(event: KeyboardEvent) {
  if (!open.value)
    return

  // 先关闭下拉层，避免同一次按键继续关闭外层弹窗。
  event.preventDefault()
  event.stopPropagation()
  closeMenu()
  triggerRef.value?.focus()
}

function handleTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled || event.isComposing)
    return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    if (!open.value) {
      void openMenu()
      return
    }
    moveActive(1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    if (!open.value) {
      void openMenu()
      return
    }
    moveActive(-1)
    return
  }

  const searching = event.target instanceof HTMLInputElement
  if (event.key === 'Enter' || (event.key === ' ' && !searching)) {
    event.preventDefault()
    if (!open.value) {
      void openMenu()
      return
    }
    chooseActive()
    return
  }

  if (event.key === 'Escape')
    handleEscape(event)
  if (event.key === 'Tab') {
    if (searching)
      triggerRef.value?.focus()
    closeMenu()
  }
}

function optionClasses(option: SelectOption, index: number) {
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

watch(
  () => [displayed.value, props.size],
  async () => {
    if (!open.value)
      return
    setActiveToSelected()
    await nextTick()
    updatePopoverPosition()
    await nextTick()
    scrollActiveIntoView()
  },
)

watch(model, async () => {
  await nextTick()
  updatePopoverPosition()
})
watch(() => props.loading, async (loading) => {
  if (loading || !open.value)
    return
  await nextTick()
  // 重试操作结束后其按钮会卸载，将键盘焦点交还给仍存在的选择控件。
  if (open.value && (document.activeElement === document.body || popoverRef.value?.contains(document.activeElement)))
    (searchRef.value?.querySelector('input') ?? triggerRef.value)?.focus()
})
watch(() => props.disabled, (disabled) => {
  if (disabled)
    closeMenu()
})

onClickOutside(rootRef, closeMenu, { ignore: [popoverRef] })
// 滚动事件随浏览器绘制更新，额外节流会让固定定位的弹层落后于输入框。
const viewportTarget = computed(() => open.value ? window : null)
useEventListener(viewportTarget, 'resize', updatePopoverPosition)
useEventListener(viewportTarget, 'scroll', updatePopoverPosition, { capture: true, passive: true })
useResizeObserver([controlRef, listboxRef, searchRef], updatePopoverPosition)
</script>

<template>
  <div ref="rootRef" class="relative inline-block text-left" v-bind="rootAttrs">
    <div ref="controlRef" :class="multiple ? triggerClasses : undefined" :style="{ anchorName: `--${selectId}` }">
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
        :aria-required="field?.required.value || undefined"
        @click="toggleMenu"
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
      <BaseSelectTags
        v-if="multiple && selectedOptions.length"
        class="relative min-w-0 flex-1"
        :options="selectedOptions"
        :size="size === 'sm' ? 'sm' : 'md'"
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
            <BaseInput
              v-model="search"
              size="sm"
              aria-label="搜索选项"
              placeholder="输入名称筛选"
              role="combobox"
              aria-expanded="true"
              :aria-controls="`${selectId}-listbox`"
              :aria-activedescendant="activeIndex >= 0 ? optionId(activeIndex) : undefined"
              @keydown="handleTriggerKeydown"
            />
          </div>
          <BaseScrollbar ref="scrollbarRef" :max-height="popoverMaxHeight" class="rounded-cp-lg">
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
                  <BaseEmpty :title="loading ? '正在加载…' : search ? '没有匹配项' : emptyText" size="sm" surface="none" role="status">
                    <template v-if="loading" #icon>
                      <LoaderCircle :size="18" class="animate-spin text-cp-text-quaternary motion-reduce:animate-none" />
                    </template>
                  </BaseEmpty>
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
                  <span class="min-w-0 truncate" :class="option.description ? 'max-w-1/2 shrink-0' : 'flex-1'">{{ option.label }}</span>
                  <span
                    v-if="option.description"
                    :title="option.description"
                    class="min-w-0 flex-1 truncate font-normal"
                    :class="option.disabled ? 'text-cp-text-disabled' : 'text-cp-text-tertiary'"
                  >
                    {{ option.description }}
                  </span>
                  <Check
                    v-if="selectedValues.includes(option.value)"
                    class="shrink-0 text-cp-primary-text"
                    :size="size === 'sm' ? 13 : size === 'lg' ? 17 : 15"
                  />
                </button>
              </template>
            </div>
          </BaseScrollbar>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
