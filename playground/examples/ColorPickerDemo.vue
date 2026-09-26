<script setup lang="ts">
import { BaseCheckbox, BaseColorPicker } from '@codex-proxy/ui'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const color = shallowRef('#5983F4')
const translucent = shallowRef('#5983F480')
const disabled = shallowRef(false)
const presets = ['#5983F4', '#0E7C72', '#A0583D', '#525B66']
</script>

<template>
  <DemoPlayground wide>
    <div class="demo-row">
      <BaseColorPicker v-model="color" :presets="presets" :allow-alpha="false" :disabled="disabled" label="主题色" />
      <code>{{ color }}</code>
      <BaseColorPicker v-model="translucent" :presets="presets" :disabled="disabled" label="半透明颜色" />
      <code>{{ translucent }}</code>
    </div>
    <template #controls>
      <BaseCheckbox v-model="disabled" label="禁用颜色选择" show-label />
    </template>
  </DemoPlayground>
</template>
