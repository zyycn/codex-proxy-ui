<script setup lang="ts">
import { ZButton, ZCheckbox, ZDialog, ZSegmented } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const open = ref(false)
const width = ref('28rem')
const showDescription = ref(true)
const sizes = [{ label: '小', value: '28rem' }, { label: '中', value: '36rem' }, { label: '大', value: '48rem' }]
</script>

<template>
  <DemoPlayground>
    <ZButton type="primary" @click="open = true">
      编辑配置
    </ZButton>
    <ZDialog v-model="open" title="编辑配置" :description="showDescription ? '变更在保存后生效' : undefined" :width="width">
      <div class="demo-stack">
        <span>按 Escape 或点击取消可以关闭弹窗</span>
        <ZButton @click="open = false">
          取消
        </ZButton>
      </div>
    </ZDialog>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <ZSegmented v-model="width" :options="sizes" aria-label="组件尺寸" size="small" />
      </div>
      <ZCheckbox v-model="showDescription" label="显示描述" />
    </template>
  </DemoPlayground>
</template>
