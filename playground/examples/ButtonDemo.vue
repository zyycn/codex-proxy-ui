<script setup lang="ts">
import { ZButton, ZCheckbox, ZSegmented, ZSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const count = ref(0)
const size = ref<'small' | 'default' | 'large'>('default')
const type = ref<'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'>('primary')
const variant = ref<'solid' | 'plain' | 'text' | 'link'>('solid')
const loading = ref(false)
const disabled = ref(false)
const sizes = [{ label: '小', value: 'small' }, { label: '中', value: 'default' }, { label: '大', value: 'large' }]
const variants = [{ label: '实体', value: 'solid' }, { label: '轻表面', value: 'plain' }, { label: '文本', value: 'text' }, { label: '链接', value: 'link' }]
const types = [{ label: '默认', value: 'default' }, { label: '主要', value: 'primary' }, { label: '成功', value: 'success' }, { label: '信息', value: 'info' }, { label: '警告', value: 'warning' }, { label: '危险', value: 'danger' }]
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <ZButton :type="type" :variant="variant" :size="size" :loading="loading" :disabled="disabled" @click="count++">
        保存配置
      </ZButton>
      <output aria-label="操作次数" class="demo-value">已操作 {{ count }} 次</output>
    </div>
    <template #controls>
      <div class="demo-control">
        <span>语义</span><ZSelect v-model="type" :options="types" size="small" aria-label="按钮语义" />
      </div>
      <div class="demo-control">
        <span>样式</span>
        <ZSelect v-model="variant" :options="variants" size="small" aria-label="按钮样式" />
      </div>
      <div class="demo-control">
        <span>尺寸</span>
        <ZSegmented v-model="size" :options="sizes" aria-label="组件尺寸" size="small" />
      </div>
      <ZCheckbox v-model="loading" label="加载中" />
      <ZCheckbox v-model="disabled" label="禁用" />
    </template>
  </DemoPlayground>
</template>
