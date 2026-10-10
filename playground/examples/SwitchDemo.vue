<script setup lang="ts">
import { ZCheckbox, ZSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const enabled = ref(true)
const disabled = ref(false)
const inlinePrompt = ref(true)
</script>

<template>
  <DemoPlayground>
    <ZSwitch v-model="enabled" aria-label="启用配置" active-text="开" inactive-text="关" :inline-prompt="inlinePrompt" :disabled="disabled" />
    <output aria-label="开关状态" class="demo-value">{{ enabled ? '配置已启用' : '配置已停用' }}</output>
    <template #controls>
      <ZCheckbox v-model="disabled" label="禁用" />
      <ZCheckbox v-model="inlinePrompt" label="文字内嵌" />
    </template>
  </DemoPlayground>
</template>
