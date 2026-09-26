<script setup lang="ts">
import { BaseButton, BaseNumberInput, BaseSelect, BaseToast, toast } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const type = ref<'success' | 'error' | 'warning' | 'info'>('success')
const duration = ref(3)
const types = [{ label: '成功', value: 'success' }, { label: '错误', value: 'error' }, { label: '警告', value: 'warning' }, { label: '信息', value: 'info' }]
</script>

<template>
  <DemoPlayground>
    <BaseButton variant="primary" @click="toast.show(type, '这是一条操作结果提示', { duration: duration * 1000 })">
      显示提示
    </BaseButton>
    <BaseToast />
    <template #controls>
      <div class="demo-control">
        <span>类型</span>
        <BaseSelect v-model="type" :options="types" size="sm" aria-label="提示类型" />
      </div>
      <div class="demo-control">
        <span>持续时间</span>
        <BaseNumberInput v-model="duration" label="提示持续时间" :min="1" :max="10" unit="秒" />
      </div>
    </template>
  </DemoPlayground>
</template>
