<script setup lang="ts">
import { BaseButton, BaseCheckbox, BaseSegmented, BaseSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const count = ref(0)
const size = ref<'sm' | 'md' | 'lg'>('md')
const variant = ref<'primary' | 'secondary' | 'soft' | 'ghost' | 'destructive'>('primary')
const loading = ref(false)
const disabled = ref(false)
const sizes = [{ label: '小', value: 'sm' }, { label: '中', value: 'md' }, { label: '大', value: 'lg' }]
const variants = [{ label: '主要', value: 'primary' }, { label: '次要', value: 'secondary' }, { label: '柔和', value: 'soft' }, { label: '无底色', value: 'ghost' }, { label: '危险', value: 'destructive' }]
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <BaseButton :variant="variant" :size="size" :loading="loading" :disabled="disabled" @click="count++">
        保存配置
      </BaseButton>
      <output aria-label="操作次数" class="demo-value">已操作 {{ count }} 次</output>
    </div>
    <template #controls>
      <div class="demo-control">
        <span>样式</span>
        <BaseSelect v-model="variant" :options="variants" size="sm" aria-label="按钮样式" />
      </div>
      <div class="demo-control">
        <span>尺寸</span>
        <BaseSegmented v-model="size" :options="sizes" label="组件尺寸" size="sm" />
      </div>
      <BaseCheckbox v-model="loading" label="加载中" show-label />
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
    </template>
  </DemoPlayground>
</template>
