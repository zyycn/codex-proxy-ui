<script setup lang="ts">
import type { PaginationProps } from './types'
import type { PagerItem } from './utils/pagination'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { computed } from 'vue'

import { useLocale } from '../../locale/context'
import IconButton from '../icon-button/IconButton.vue'
import Select from '../select/Select.vue'
import {
  getCurrentPage,
  getPagerItems,
  getPageSizeOptions,
  getTotalPages,
} from './utils/pagination'

const props = defineProps<PaginationProps>()

const emit = defineEmits<{ currentChange: [page: number], sizeChange: [pageSize: number] }>()

const locale = useLocale()

const page = defineModel<number>('currentPage', { default: 1 })
const pageSize = defineModel<number>('pageSize', { default: 20 })
const pagination = computed(() => ({ currentPage: page.value, pageSize: pageSize.value, total: props.total, pageSizes: props.pageSizes }))
const totalPages = computed(() => getTotalPages(pagination.value))
const currentPage = computed(() => getCurrentPage(pagination.value, totalPages.value))
const pageSizeOptions = computed(() => getPageSizeOptions(pagination.value, locale.value.pagination.pageSize))
const pagerItems = computed(() => getPagerItems(totalPages.value, currentPage.value))
const adjacentPagerItems = computed(() => {
  const count = Math.min(3, totalPages.value)
  const start = Math.max(1, Math.min(currentPage.value - 1, totalPages.value - count + 1))
  return Array.from({ length: count }, (_, index) => start + index)
})
const compactPagerItems = computed<PagerItem[]>(() => {
  const total = totalPages.value
  const current = currentPage.value
  if (total <= 5)
    return Array.from({ length: total }, (_, index) => index + 1)
  if (current <= 3)
    return [1, 2, 3, 'ellipsis', total]
  if (current >= total - 2)
    return [1, 'ellipsis', total - 2, total - 1, total]
  return [1, 'ellipsis', current, 'ellipsis', total]
})

const pagerVisibilityClasses = [
  'flex @min-[19.5rem]/pagination:hidden',
  'hidden @min-[19.5rem]/pagination:flex @min-[24.5rem]/pagination:hidden',
  'hidden @min-[24.5rem]/pagination:flex @min-[29.5rem]/pagination:hidden',
  'hidden @min-[29.5rem]/pagination:flex',
]

function changePageSize(value: number | undefined) {
  if (props.disabled || value === undefined || value === pageSize.value)
    return
  pageSize.value = value
  emit('sizeChange', value)
}

function goToPage(target: number) {
  if (props.disabled || target < 1 || target > totalPages.value || target === currentPage.value) {
    return
  }

  page.value = target
  emit('currentChange', target)
}

function paginationPageClass(page: number) {
  return [
    'inline-flex size-8 items-center justify-center rounded-cp border-0 text-xs font-bold leading-none transition-colors duration-150 outline-none',
    page === currentPage.value
      ? 'cursor-default bg-(--cp-button-primary-bg) text-(--cp-button-primary-color)'
      : 'cursor-pointer bg-cp-fill-quaternary text-cp-text hover:bg-cp-bg-text-hover focus-visible:ring-2 focus-visible:ring-cp-control-outline focus-visible:ring-offset-2 focus-visible:ring-offset-cp-bg-container',
  ]
}
</script>

<template>
  <footer
    class="@container/pagination mt-2 min-h-10 min-w-0 shrink-0 px-0 py-1"
  >
    <div class="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 @min-[36rem]/pagination:grid-cols-[minmax(0,1fr)_auto_auto] @min-[36rem]/pagination:gap-3">
      <span class="hidden min-w-0 truncate text-cp-sm font-emphasis text-cp-text-secondary @min-[36rem]/pagination:block">
        {{ locale.pagination.total(pagination.total) }}
      </span>
      <Select
        :model-value="pageSize"
        :aria-label="locale.pagination.sizeLabel"
        :options="pageSizeOptions"
        :disabled="disabled"
        size="small"
        class="w-28 shrink-0"
        @change="changePageSize"
      />

      <nav
        :aria-label="locale.pagination.label"
        class="flex shrink-0 items-center justify-self-end gap-2"
      >
        <IconButton
          variant="solid"
          size="small"
          :disabled="disabled || currentPage <= 1"
          :aria-label="locale.pagination.previous"
          @click="goToPage(currentPage - 1)"
        >
          <ChevronLeft class="size-4" />
        </IconButton>

        <div
          v-for="(items, variant) in [[currentPage], adjacentPagerItems, compactPagerItems, pagerItems]"
          :key="variant"
          class="items-center gap-2"
          :class="pagerVisibilityClasses[variant]"
        >
          <template v-for="(item, index) in items" :key="`${item}-${index}`">
            <span
              v-if="item === 'ellipsis'"
              class="inline-flex size-8 items-center justify-center text-xs font-bold text-cp-text-quaternary"
            >
              …
            </span>
            <button
              v-else
              type="button"
              :class="paginationPageClass(item)"
              :disabled="disabled || item === currentPage"
              :aria-current="item === currentPage ? 'page' : undefined"
              @click="goToPage(item)"
            >
              {{ item }}
            </button>
          </template>
        </div>

        <IconButton
          variant="solid"
          size="small"
          :disabled="disabled || currentPage >= totalPages"
          :aria-label="locale.pagination.next"
          @click="goToPage(currentPage + 1)"
        >
          <ChevronRight class="size-4" />
        </IconButton>
      </nav>
    </div>
  </footer>
</template>
