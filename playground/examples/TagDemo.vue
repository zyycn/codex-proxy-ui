<script setup lang="ts">
import { ZButton, ZCheckbox, ZSelect, ZTag } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const visible = ref(true)
const closable = ref(true)
const round = ref(false)
const type = ref<'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'>('success')
const types = ['default', 'primary', 'success', 'info', 'warning', 'danger'].map(value => ({ label: value, value }))
</script>

<template>
  <DemoPlayground>
    <ZTag v-if="visible" :type="type" :round="round" :closable="closable" @close="visible = false">
      已启用
    </ZTag>
    <ZButton v-else @click="visible = true">
      恢复标签
    </ZButton>
    <template #controls>
      <div class="demo-control">
        <span>状态</span>
        <ZSelect v-model="type" class="w-36" :options="types" size="small" aria-label="标签状态" />
      </div>
      <ZCheckbox v-model="closable" label="可关闭" />
      <ZCheckbox v-model="round" label="圆角" />
    </template>
  </DemoPlayground>
</template>
