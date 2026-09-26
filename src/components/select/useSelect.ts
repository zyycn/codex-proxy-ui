import type { Ref } from 'vue'
import type BaseScrollbar from '../scrollbar/BaseScrollbar.vue'
import type { SelectOption, SelectProps, SelectValue } from './types'
import type { SelectPositionElements } from './useSelectPosition'
import { onClickOutside } from '@vueuse/core'
import { computed, nextTick, ref, useId, watch } from 'vue'
import { useSelectPosition } from './useSelectPosition'

interface SelectElements extends SelectPositionElements {
  rootRef: Ref<HTMLElement | null>
  triggerRef: Ref<HTMLButtonElement | null>
  popoverRef: Ref<HTMLElement | null>
  scrollbarRef: Ref<InstanceType<typeof BaseScrollbar> | null>
}

export function useSelect<Multiple extends boolean>(
  props: Readonly<SelectProps<Multiple>>,
  model: Ref<SelectValue<Multiple>>,
  elements: SelectElements,
) {
  const { rootRef, triggerRef, searchRef, popoverRef, listboxRef, scrollbarRef } = elements
  const search = ref('')
  const open = ref(false)
  const activeIndex = ref(-1)
  const selectId = `base-select-${useId()}`
  const {
    popoverStyle,
    popoverMaxHeight,
    updatePopoverPosition,
  } = useSelectPosition(open, selectId, elements)

  const selectedValues = computed<string[]>(() => Array.isArray(model.value) ? model.value : [model.value])
  const selectedOptions = computed(() => selectedValues.value.map(value => props.options.find(option => option.value === value) ?? { value, label: value }))
  const selectionLabel = computed(() => selectedOptions.value.map(option => option.label).join('、'))
  const displayed = computed(() => props.loading
    ? []
    : props.options.filter(option =>
        !props.filterable || `${option.label} ${option.description ?? ''}`.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()),
      ))
  const selectedOption = computed(() => props.options.find(option => option.value === model.value))

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

  return {
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
    handleTriggerKeydown,
    removeOption,
    handleOptionFocus,
    chooseOption,
    handleEscape,
  }
}
