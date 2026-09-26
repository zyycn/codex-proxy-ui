<script setup lang="ts">
import { BaseSegmented } from '@codex-proxy/ui/segmented'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const selected = ref('installed')
const options = [{ label: '已安装', value: 'installed' }, { label: '扩展页', value: 'extensions' }]
</script>

<template>
  <DemoPlayground wide>
    <div class="demo-stack">
      <BaseSegmented v-model="selected" label="插件视图" :options="options" />
      <span>当前视图：{{ selected === 'installed' ? '已安装' : '扩展页' }}</span>
    </div>
  </DemoPlayground>
</template>
