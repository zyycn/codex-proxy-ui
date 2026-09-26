<script setup lang="ts">
import { BaseMarkdown } from '@codex-proxy/ui/markdown'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const source = '### 请求工作台\n\n通过 **显式授权** 使用插件能力\n\n- 管理页面\n- 请求中间件\n\n`x-cpr-example: official-example`'
</script>

<template>
  <DemoPlayground wide>
    <BaseMarkdown :source="source" />
  </DemoPlayground>
</template>
