<script setup lang="ts">
import { BaseCheckbox, BaseRadio } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const scope = ref('selected')
const disabled = ref(false)
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <BaseRadio v-model="scope" name="scope" value="selected" label="指定请求" :disabled="disabled" show-label />
      <BaseRadio v-model="scope" name="scope" value="all" label="全部请求" :disabled="disabled" show-label />
    </div>
    <template #controls>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
    </template>
  </DemoPlayground>
</template>
