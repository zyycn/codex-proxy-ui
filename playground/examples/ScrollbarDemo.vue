<script setup lang="ts">
import { ZCheckbox, ZScrollbar } from '@codex-proxy/ui'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const alwaysVisible = shallowRef(false)
const scrollTop = shallowRef(0)
</script>

<template>
  <DemoPlayground wide>
    <ZScrollbar height="224px" horizontal :always-visible="alwaysVisible" @scroll="scrollTop = $event.scrollTop">
      <div class="grid min-w-180 gap-2 pr-4 pb-4">
        <div v-for="index in 20" :key="index" class="rounded-cp bg-cp-fill-tertiary px-4 py-3">
          示例内容 {{ index }} · 同时支持横向与纵向滚动
        </div>
      </div>
    </ZScrollbar>
    <template #controls>
      <div class="demo-row">
        <ZCheckbox v-model="alwaysVisible" label="始终显示滚动条" />
        <output aria-label="滚动位置">已滚动 {{ Math.round(scrollTop) }} px</output>
      </div>
    </template>
  </DemoPlayground>
</template>
