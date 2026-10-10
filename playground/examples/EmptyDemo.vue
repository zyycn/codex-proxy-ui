<script setup lang="ts">
import { ZButton, ZCheckbox, ZEmpty } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const showDescription = ref(true)
const showAction = ref(true)
const clicked = ref(false)
</script>

<template>
  <DemoPlayground>
    <ZEmpty title="暂无插件" :description="showDescription ? '安装插件后即可开始配置' : undefined">
      <template v-if="showAction" #action>
        <ZButton type="primary" @click="clicked = true">
          安装插件
        </ZButton>
      </template>
    </ZEmpty>
    <output v-if="clicked" aria-label="操作结果" class="demo-value">已触发安装操作</output>
    <template #controls>
      <ZCheckbox v-model="showDescription" label="显示描述" />
      <ZCheckbox v-model="showAction" label="显示操作" />
    </template>
  </DemoPlayground>
</template>
