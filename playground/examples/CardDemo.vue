<script setup lang="ts">
import { ZCard, ZCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const compact = ref(false)
const showDescription = ref(true)
</script>

<template>
  <DemoPlayground>
    <ZCard title="请求工作台" :description="showDescription ? '管理页面与请求中间件' : undefined" :padding="compact ? 'compact' : 'default'">
      <p>将相关内容放在同一个表面，保持标题与操作区清晰</p>
    </ZCard>
    <template #controls>
      <ZCheckbox v-model="compact" label="紧凑间距" />
      <ZCheckbox v-model="showDescription" label="显示描述" />
    </template>
  </DemoPlayground>
</template>
