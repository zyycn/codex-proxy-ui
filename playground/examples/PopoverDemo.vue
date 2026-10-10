<script setup lang="ts">
import { ZButton, ZInputNumber, ZPopover, ZSelect } from '@codex-proxy/ui'
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
    <ZPopover :placement="placement" :trigger="trigger" :offset="offset">
      <template #reference>
        <ZButton>授权说明</ZButton>
      </template>
      <div class="p-4">
        插件只会使用已明确授予的权限
      </div>
    </ZPopover>
    <template #controls>
      <div class="demo-control">
        <span>位置</span>
        <ZSelect v-model="placement" :options="placements" size="small" aria-label="气泡位置" />
      </div>
      <div class="demo-control">
        <span>触发</span>
        <ZSelect v-model="trigger" :options="triggers" size="small" aria-label="触发方式" />
      </div>
      <div class="demo-control">
        <span>间距</span>
        <ZInputNumber v-model="offset" size="small" aria-label="气泡间距" :min="0" :max="24" />
      </div>
    </template>
  </DemoPlayground>
</template>
