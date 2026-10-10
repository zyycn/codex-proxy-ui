<script setup lang="ts">
import { ZCheckbox, ZInput } from '@codex-proxy/ui'
import { vLoading } from '@codex-proxy/ui/loading'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const loading = shallowRef(true)
const text = shallowRef('加载中')
const preserveContent = shallowRef(false)
</script>

<template>
  <DemoPlayground wide>
    <div v-loading="{ loading, text, preserveContent }" class="grid h-44 content-center gap-3 rounded-cp-lg border border-cp-border bg-cp-bg-container p-5">
      <div v-for="name in ['生产环境', '测试环境', '开发环境']" :key="name" class="flex items-center justify-between gap-3 text-cp-sm">
        <span>{{ name }}</span>
        <span class="text-cp-text-secondary">配置已就绪</span>
      </div>
    </div>
    <template #controls>
      <div class="demo-row">
        <ZCheckbox v-model="loading" label="显示加载" />
        <ZCheckbox v-model="preserveContent" label="保留内容" />
        <div class="demo-row">
          <span>文案</span>
          <ZInput v-model="text" size="small" class="w-32" aria-label="加载文案" />
        </div>
      </div>
    </template>
  </DemoPlayground>
</template>
