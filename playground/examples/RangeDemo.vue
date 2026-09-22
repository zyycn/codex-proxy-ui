<script setup lang="ts">
import { BaseCheckbox, BaseRange } from '@codex-proxy/ui'
import { shallowRef } from 'vue'

const value = shallowRef(60)
const disabled = shallowRef(false)
</script>

<template>
  <div class="demo-stack">
    <div class="flex items-center justify-between gap-3">
      <span>透明度</span><output aria-label="当前透明度">{{ value }}%</output>
    </div>
    <BaseRange v-model="value" label="透明度" :min="0" :max="100" :step="5" unit="%" :disabled="disabled" />
    <BaseCheckbox v-model="disabled" label="禁用滑块" show-label />
  </div>
</template>
