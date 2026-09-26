<script setup lang="ts">
import { BaseButton, BaseCheckbox, BaseSelect, BaseTag } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const visible = ref(true)
const closable = ref(true)
const round = ref(false)
const type = ref<'neutral' | 'primary' | 'success' | 'info' | 'warning' | 'danger'>('success')
const types = ['neutral', 'primary', 'success', 'info', 'warning', 'danger'].map(value => ({ label: value, value }))
</script>

<template>
  <DemoPlayground>
    <BaseTag v-if="visible" :type="type" :round="round" :closable="closable" @close="visible = false">
      已启用
    </BaseTag>
    <BaseButton v-else @click="visible = true">
      恢复标签
    </BaseButton>
    <template #controls>
      <div class="demo-control">
        <span>状态</span>
        <BaseSelect v-model="type" :options="types" size="sm" aria-label="标签状态" />
      </div>
      <BaseCheckbox v-model="closable" label="可关闭" show-label />
      <BaseCheckbox v-model="round" label="圆角" show-label />
    </template>
  </DemoPlayground>
</template>
