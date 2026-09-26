<script setup lang="ts">
import { BaseButton, BaseCheckbox, BaseEmpty } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const showDescription = ref(true)
const showAction = ref(true)
const clicked = ref(false)
</script>

<template>
  <DemoPlayground>
    <BaseEmpty title="暂无插件" :description="showDescription ? '安装插件后即可开始配置' : undefined">
      <template v-if="showAction" #action>
        <BaseButton variant="primary" @click="clicked = true">
          安装插件
        </BaseButton>
      </template>
    </BaseEmpty>
    <output v-if="clicked" aria-label="操作结果" class="demo-value">已触发安装操作</output>
    <template #controls>
      <BaseCheckbox v-model="showDescription" label="显示描述" show-label />
      <BaseCheckbox v-model="showAction" label="显示操作" show-label />
    </template>
  </DemoPlayground>
</template>
