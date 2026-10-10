<script setup lang="ts">
import { ZCheckbox, ZSlider } from '@codex-proxy/ui'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = shallowRef(60)
const disabled = shallowRef(false)
</script>

<template>
  <DemoPlayground wide>
    <div class="flex items-center justify-between gap-3">
      <span>透明度</span>
      <output aria-label="当前透明度">{{ value }}%</output>
    </div>
    <ZSlider v-model="value" aria-label="透明度" :min="0" :max="100" :step="5" unit="%" :disabled="disabled" />
    <template #controls>
      <ZCheckbox v-model="disabled" label="禁用滑块" />
    </template>
  </DemoPlayground>
</template>
