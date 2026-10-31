<script setup lang="ts">
import type { ButtonType, ButtonVariant, ComponentSize } from '@codex-proxy/ui'
import { ZButton, ZCheckbox, ZSegmented, ZSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

defineProps<{ example?: 'basic' | 'disabled' | 'loading' | 'sizes' | 'playground' }>()

const count = ref(0)
const size = ref<'small' | 'default' | 'large'>('default')
const type = ref<'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'>('primary')
const variant = ref<'solid' | 'plain' | 'text' | 'link'>('solid')
const loading = ref(false)
const disabled = ref(false)
const sizes = [{ label: '小', value: 'small' }, { label: '中', value: 'default' }, { label: '大', value: 'large' }] satisfies { label: string, value: ComponentSize }[]
const variants = [{ label: '实体', value: 'solid' }, { label: '轻表面', value: 'plain' }, { label: '文本', value: 'text' }, { label: '链接', value: 'link' }] satisfies { label: string, value: ButtonVariant }[]
const types = [{ label: '默认', value: 'default' }, { label: '主要', value: 'primary' }, { label: '成功', value: 'success' }, { label: '信息', value: 'info' }, { label: '警告', value: 'warning' }, { label: '危险', value: 'danger' }] satisfies { label: string, value: ButtonType }[]
</script>

<template>
  <DemoPlayground wide>
    <template v-if="!example || example === 'basic'">
      <div v-for="item in variants" :key="item.value" class="demo-row" :aria-label="item.label">
        <ZButton v-for="buttonType in types" :key="buttonType.value" :type="buttonType.value" :variant="item.value">
          {{ buttonType.label }}
        </ZButton>
      </div>
    </template>
    <div v-else-if="example === 'disabled'" class="demo-row">
      <ZButton v-for="item in types" :key="item.value" :type="item.value" disabled>
        {{ item.label }}
      </ZButton>
    </div>
    <div v-else-if="example === 'loading'" class="demo-row">
      <ZButton type="primary" loading>
        保存中
      </ZButton>
      <ZButton variant="plain" loading>
        加载中
      </ZButton>
    </div>
    <div v-else-if="example === 'sizes'" class="demo-row">
      <ZButton v-for="item in sizes" :key="item.value" :size="item.value" type="primary">
        {{ item.label }}尺寸
      </ZButton>
    </div>
    <div v-else class="demo-row">
      <ZButton :type="type" :variant="variant" :size="size" :loading="loading" :disabled="disabled" @click="count++">
        保存配置
      </ZButton>
      <output aria-label="操作次数" class="demo-value">已操作 {{ count }} 次</output>
    </div>
    <template v-if="example === 'playground'" #controls>
      <div class="demo-control">
        <span>语义</span><ZSelect v-model="type" class="w-36" :options="types" size="small" aria-label="按钮语义" />
      </div>
      <div class="demo-control">
        <span>样式</span>
        <ZSelect v-model="variant" class="w-36" :options="variants" size="small" aria-label="按钮样式" />
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
