<script setup lang="ts">
import { BaseCheckbox, BaseIconButton, BaseSegmented } from '@codex-proxy/ui'
import { RefreshCw } from '@lucide/vue'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const count = ref(0)
const size = ref<'sm' | 'md' | 'lg'>('md')
const loading = ref(false)
const disabled = ref(false)
const sizes = [{ label: '小', value: 'sm' }, { label: '中', value: 'md' }, { label: '大', value: 'lg' }]
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <BaseIconButton label="刷新配置" :size="size" :loading="loading" :disabled="disabled" @click="count++">
        <RefreshCw />
      </BaseIconButton>
      <output aria-label="刷新次数" class="demo-value">已刷新 {{ count }} 次</output>
    </div>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <BaseSegmented v-model="size" :options="sizes" label="组件尺寸" size="sm" />
      </div>
      <BaseCheckbox v-model="loading" label="加载中" show-label />
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
    </template>
  </DemoPlayground>
</template>
