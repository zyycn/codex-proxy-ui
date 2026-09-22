<script setup lang="ts">
import { BaseCheckbox } from '@codex-proxy/ui/checkbox'
import { BaseSegmented } from '@codex-proxy/ui/segmented'
import { BaseTable, defineTableColumns } from '@codex-proxy/ui/table'
import { computed, shallowRef } from 'vue'

const state = shallowRef('ready')
const showHeaderWhenEmpty = shallowRef(true)
const states = [
  { label: '已加载', value: 'ready' },
  { label: '初次加载', value: 'initial' },
  { label: '刷新中', value: 'refreshing' },
  { label: '空数据', value: 'empty' },
]
const loading = computed(() => state.value === 'initial' || state.value === 'refreshing')

const rows = [
  { id: 'workbench', name: '请求工作台', version: '0.1.0', status: '已启用' },
  { id: 'inspector', name: '请求检查器', version: '0.2.1', status: '待配置' },
]
const columns = defineTableColumns<typeof rows[number]>([
  { key: 'name', label: '插件', kind: 'identity' },
  { key: 'version', label: '版本', kind: 'mono', size: 'sm' },
  { key: 'status', label: '状态', kind: 'status' },
])
</script>

<template>
  <div class="demo-stack">
    <div class="demo-row">
      <BaseSegmented v-model="state" :options="states" label="表格状态" />
      <BaseCheckbox v-model="showHeaderWhenEmpty" label="空数据时保留表头" show-label />
    </div>
    <div class="h-56">
      <BaseTable
        :key="state === 'initial' ? 'initial' : 'loaded'"
        :columns="columns"
        :rows="state === 'ready' ? rows : []"
        :loading="loading"
        :show-header-when-empty="showHeaderWhenEmpty"
        row-key="id"
      />
    </div>
  </div>
</template>
