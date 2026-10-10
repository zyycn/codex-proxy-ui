<script setup lang="ts">
import { ZCheckbox, ZInputNumber } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref(10)
const step = ref(1)
const disabled = ref(false)
</script>

<template>
  <DemoPlayground>
    <ZInputNumber v-model="value" aria-label="并发数量" :min="0" :max="100" :step="step" :disabled="disabled" size="default" />
    <output aria-label="当前数值" class="demo-value">当前值：{{ value }}</output>
    <template #controls>
      <div class="demo-control">
        <span>步长</span>
        <ZInputNumber v-model="step" size="small" aria-label="步长" :min="1" :max="10" />
      </div>
      <ZCheckbox v-model="disabled" label="禁用" />
    </template>
  </DemoPlayground>
</template>
