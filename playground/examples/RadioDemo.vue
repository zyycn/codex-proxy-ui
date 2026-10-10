<script setup lang="ts">
import { ZCheckbox, ZRadio } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const scope = ref('selected')
const disabled = ref(false)
</script>

<template>
  <DemoPlayground>
    <div class="demo-row">
      <ZRadio v-model="scope" name="scope" value="selected" label="指定请求" :disabled="disabled" />
      <ZRadio v-model="scope" name="scope" value="all" label="全部请求" :disabled="disabled" />
    </div>
    <template #controls>
      <ZCheckbox v-model="disabled" label="禁用" />
    </template>
  </DemoPlayground>
</template>
