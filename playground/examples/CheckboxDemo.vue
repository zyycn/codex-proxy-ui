<script setup lang="ts">
import { BaseCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const checked = ref(true)
const disabled = ref(false)
const indeterminate = ref(false)
</script>

<template>
  <DemoPlayground>
    <BaseCheckbox v-model="checked" label="允许修改响应头" :disabled="disabled" :indeterminate="indeterminate" show-label />
    <output aria-label="选择状态" class="demo-value">{{ checked ? '已选中' : '未选中' }}</output>
    <template #controls>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
      <BaseCheckbox v-model="indeterminate" label="半选状态" show-label />
    </template>
  </DemoPlayground>
</template>
