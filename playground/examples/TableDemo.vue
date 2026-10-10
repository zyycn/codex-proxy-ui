<script setup lang="ts">
import { ZCheckbox } from '@codex-proxy/ui/checkbox'
import { ZSegmented } from '@codex-proxy/ui/segmented'
import { defineTableColumns, ZTable } from '@codex-proxy/ui/table'
import { computed, shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

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
  <DemoPlayground wide>
    <div class="h-56">
      <ZTable
        :key="state === 'initial' ? 'initial' : 'loaded'"
        :columns="columns"
        :data="state === 'ready' ? rows : []"
        :loading="loading"
        :show-header-when-empty="showHeaderWhenEmpty"
        row-key="id"
      />
    </div>
    <template #controls>
      <div class="demo-row">
        <ZSegmented v-model="state" :options="states" aria-label="表格状态" />
        <ZCheckbox v-model="showHeaderWhenEmpty" label="空数据时保留表头" />
      </div>
    </template>
  </DemoPlayground>
</template>
