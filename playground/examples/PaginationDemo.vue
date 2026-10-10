<script setup lang="ts">
import { ZCheckbox, ZPagination } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const page = ref(1)
const size = ref(20)
const disabled = ref(false)
</script>

<template>
  <DemoPlayground wide>
    <ZPagination v-model:current-page="page" v-model:page-size="size" :total="123" :disabled="disabled" />
    <output aria-label="分页状态">第 {{ page }} 页，每页 {{ size }} 条</output>
    <template #controls>
      <ZCheckbox v-model="disabled" label="禁用" />
    </template>
  </DemoPlayground>
</template>
