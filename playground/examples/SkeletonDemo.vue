<script setup lang="ts">
import { BaseCheckbox, BaseSkeleton } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const loading = ref(true)
const animated = ref(true)
</script>

<template>
  <DemoPlayground>
    <div v-if="loading" class="demo-stack" aria-label="加载占位">
      <BaseSkeleton shape="circle" class="size-12" :animated="animated" />
      <BaseSkeleton shape="text" class="w-2/3" :animated="animated" />
      <BaseSkeleton shape="text" class="w-full" :animated="animated" />
    </div>
    <div v-else class="demo-stack">
      <strong>请求工作台</strong>
      <span>内容已加载</span>
    </div>
    <template #controls>
      <BaseCheckbox v-model="loading" label="加载中" show-label />
      <BaseCheckbox v-model="animated" label="动画" show-label />
    </template>
  </DemoPlayground>
</template>
