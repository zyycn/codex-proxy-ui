<script setup lang="ts">
import { BaseButton, BaseCheckbox, BaseModal, BaseSegmented } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const open = ref(false)
const size = ref<'sm' | 'md' | 'lg'>('sm')
const showDescription = ref(true)
const sizes = [{ label: '小', value: 'sm' }, { label: '中', value: 'md' }, { label: '大', value: 'lg' }]
</script>

<template>
  <DemoPlayground>
    <BaseButton variant="primary" @click="open = true">
      编辑配置
    </BaseButton>
    <BaseModal v-model="open" title="编辑配置" :description="showDescription ? '变更在保存后生效' : undefined" :size="size">
      <div class="demo-stack">
        <span>按 Escape 或点击取消可以关闭弹窗</span>
        <BaseButton @click="open = false">
          取消
        </BaseButton>
      </div>
    </BaseModal>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <BaseSegmented v-model="size" :options="sizes" label="组件尺寸" size="sm" />
      </div>
      <BaseCheckbox v-model="showDescription" label="显示描述" show-label />
    </template>
  </DemoPlayground>
</template>
