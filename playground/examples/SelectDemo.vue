<script setup lang="ts">
import { ZCheckbox, ZFormItem, ZInputNumber, ZSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const single = ref<string>()
const selected = ref(['production', 'testing', 'team'])
const multiple = ref(true)
const filterable = ref(true)
const collapse = ref(true)
const disabled = ref(false)
const loading = ref(false)
const maxCollapseTags = ref(1)
const groups = [
  { label: '生产环境', value: 'production' },
  { label: '测试环境', value: 'testing' },
  { label: '团队共享', value: 'team' },
  { label: '开发环境', value: 'development' },
  { label: '暂停使用', value: 'paused', disabled: true },
]
</script>

<template>
  <DemoPlayground>
    <ZFormItem label="账号分组" class="w-60 max-w-full">
      <ZSelect v-if="multiple" v-model="selected" :options="groups" multiple :filterable="filterable" clearable :collapse-tags="collapse" collapse-tags-tooltip :max-collapse-tags="maxCollapseTags" :disabled="disabled" :loading="loading" />
      <ZSelect v-else v-model="single" :options="groups" :filterable="filterable" clearable :disabled="disabled" :loading="loading" />
    </ZFormItem>
    <template #controls>
      <ZCheckbox v-model="multiple" label="多选" />
      <ZCheckbox v-model="filterable" label="可搜索" />
      <ZCheckbox v-model="disabled" label="禁用" />
      <ZCheckbox v-model="loading" label="加载中" />
      <template v-if="multiple">
        <ZCheckbox v-model="collapse" label="折叠标签" />
        <div v-if="collapse" class="demo-control">
          <span>可见标签</span>
          <ZInputNumber v-model="maxCollapseTags" class="w-28" size="small" aria-label="可见标签数量" :min="1" :max="4" />
        </div>
      </template>
    </template>
  </DemoPlayground>
</template>
