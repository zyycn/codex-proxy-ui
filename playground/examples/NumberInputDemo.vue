<script setup lang="ts">
import { BaseCheckbox, BaseNumberInput } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref(10)
const step = ref(1)
const disabled = ref(false)
</script>

<template>
  <DemoPlayground>
    <BaseNumberInput v-model="value" label="并发数量" :min="0" :max="100" :step="step" :disabled="disabled" size="md" />
    <output aria-label="当前数值" class="demo-value">当前值：{{ value }}</output>
    <template #controls>
      <div class="demo-control">
        <span>步长</span>
        <BaseNumberInput v-model="step" label="步长" :min="1" :max="10" />
      </div>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
    </template>
  </DemoPlayground>
</template>
