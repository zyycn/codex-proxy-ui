<script setup lang="ts">
import { BaseCheckbox } from '@codex-proxy/ui/checkbox'
import { BaseTable, BaseTableColumnSettings, BaseTablePagination, defineTableColumns, useTableColumns } from '@codex-proxy/ui/table'
import { computed, shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const currentPage = shallowRef(1)
const pageSize = shallowRef(5)
const loading = shallowRef(false)
const rows = Array.from({ length: 26 }, (_, index) => ({ id: index + 1, name: `配置 ${index + 1}`, status: index % 2 ? '已停用' : '已启用' }))
const columns = defineTableColumns<typeof rows[number]>([
  { key: 'id', label: '序号', kind: 'mono', size: 'xs' },
  { key: 'name', label: '名称', kind: 'identity', hideable: false },
  { key: 'status', label: '状态', kind: 'status' },
])
const { visibleColumns, columnOptions, setColumnVisible, setColumnOrder, resetColumns } = useTableColumns(columns, 'ui-playground-table-tools')
const pageRows = computed(() => rows.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
const pagination = computed(() => ({ currentPage: currentPage.value, pageSize: pageSize.value, total: rows.length, pageSizes: [5, 10, 20] }))
function changePageSize(value: number) {
  pageSize.value = value
  currentPage.value = 1
}
</script>

<template>
  <DemoPlayground wide>
    <div class="flex items-center justify-between gap-3">
      <BaseCheckbox v-model="loading" label="加载状态" show-label />
      <BaseTableColumnSettings :options="columnOptions" @change="setColumnVisible" @reorder="setColumnOrder" @reset="resetColumns" />
    </div>
    <div class="h-88">
      <BaseTable :columns="visibleColumns" :rows="pageRows" :loading="loading" row-key="id" />
    </div>
    <BaseTablePagination :pagination="pagination" :loading="loading" @page-change="currentPage = $event" @page-size-change="changePageSize" />
  </DemoPlayground>
</template>
