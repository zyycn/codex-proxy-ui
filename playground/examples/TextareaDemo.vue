<script setup lang="ts">
import { ZCheckbox, ZFormItem, ZInputNumber, ZTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref('为指定请求添加响应标记')
const rows = ref(3)
const disabled = ref(false)
const autosize = ref(true)
</script>

<template>
  <DemoPlayground>
    <ZFormItem label="配置说明">
      <ZTextarea v-model="value" :rows="rows" :disabled="disabled" :autosize="autosize ? { minRows: rows, maxRows: 8 } : false" placeholder="补充说明" />
    </ZFormItem>
    <template #controls>
      <div class="demo-control">
        <span>行数</span>
        <ZInputNumber v-model="rows" size="small" aria-label="行数" :min="2" :max="8" />
      </div>
      <ZCheckbox v-model="disabled" label="禁用" />
      <ZCheckbox v-model="autosize" label="自适应高度" />
    </template>
  </DemoPlayground>
</template>
