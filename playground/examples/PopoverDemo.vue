<script setup lang="ts">
import { BaseButton, BaseNumberInput, BasePopover, BaseSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const placement = ref<'top' | 'bottom' | 'left' | 'right'>('bottom')
const trigger = ref<'click' | 'hover' | 'hover-click'>('click')
const offset = ref(6)
const placements = [{ label: '上', value: 'top' }, { label: '下', value: 'bottom' }, { label: '左', value: 'left' }, { label: '右', value: 'right' }]
const triggers = [{ label: '点击', value: 'click' }, { label: '悬停', value: 'hover' }, { label: '点击或悬停', value: 'hover-click' }]
</script>

<template>
  <DemoPlayground>
    <BasePopover :key="`${placement}-${trigger}-${offset}`" :placement="placement" :trigger="trigger" :offset="offset">
      <template #trigger>
        <BaseButton>授权说明</BaseButton>
      </template>
      <div class="p-4">
        插件只会使用已明确授予的权限
      </div>
    </BasePopover>
    <template #controls>
      <div class="demo-control">
        <span>位置</span>
        <BaseSelect v-model="placement" :options="placements" size="sm" aria-label="气泡位置" />
      </div>
      <div class="demo-control">
        <span>触发</span>
        <BaseSelect v-model="trigger" :options="triggers" size="sm" aria-label="触发方式" />
      </div>
      <div class="demo-control">
        <span>间距</span>
        <BaseNumberInput v-model="offset" label="气泡间距" :min="0" :max="24" />
      </div>
    </template>
  </DemoPlayground>
</template>
