<script setup lang="ts">
import { ZCheckbox, ZIconButton, ZSegmented } from '@codex-proxy/ui'
import { RefreshCw } from '@lucide/vue'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const count = ref(0)
const size = ref<'small' | 'default' | 'large'>('default')
const loading = ref(false)
const disabled = ref(false)
const sizes = [{ label: '小', value: 'small' }, { label: '中', value: 'default' }, { label: '大', value: 'large' }]
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <ZIconButton aria-label="刷新配置" :size="size" :loading="loading" :disabled="disabled" @click="count++">
        <RefreshCw />
      </ZIconButton>
      <output aria-label="刷新次数" class="demo-value">已刷新 {{ count }} 次</output>
    </div>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <ZSegmented v-model="size" :options="sizes" aria-label="组件尺寸" size="small" />
      </div>
      <ZCheckbox v-model="loading" label="加载中" />
      <ZCheckbox v-model="disabled" label="禁用" />
    </template>
  </DemoPlayground>
</template>
