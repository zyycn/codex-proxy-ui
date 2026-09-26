<script setup lang="ts">
import { BaseCheckbox, BaseSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const enabled = ref(true)
const disabled = ref(false)
const inlinePrompt = ref(true)
</script>

<template>
  <DemoPlayground>
    <BaseSwitch v-model="enabled" label="启用配置" active-text="开" inactive-text="关" :inline-prompt="inlinePrompt" :disabled="disabled" />
    <output aria-label="开关状态" class="demo-value">{{ enabled ? '配置已启用' : '配置已停用' }}</output>
    <template #controls>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
      <BaseCheckbox v-model="inlinePrompt" label="文字内嵌" show-label />
    </template>
  </DemoPlayground>
</template>
