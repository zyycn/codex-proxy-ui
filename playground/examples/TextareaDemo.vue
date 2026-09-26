<script setup lang="ts">
import { BaseCheckbox, BaseFormItem, BaseNumberInput, BaseTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref('为指定请求添加响应标记')
const rows = ref(3)
const disabled = ref(false)
</script>

<template>
  <DemoPlayground>
    <BaseFormItem label="配置说明">
      <BaseTextarea v-model="value" :rows="rows" :disabled="disabled" placeholder="补充说明" />
    </BaseFormItem>
    <template #controls>
      <div class="demo-control">
        <span>行数</span>
        <BaseNumberInput v-model="rows" label="行数" :min="2" :max="8" />
      </div>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
    </template>
  </DemoPlayground>
</template>
