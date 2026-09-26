<script setup lang="ts">
import { BaseCheckbox, BaseFormItem, BaseNumberInput, BaseSelect } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const single = ref('production')
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
    <BaseFormItem label="账号分组">
      <BaseSelect v-if="multiple" v-model="selected" :options="groups" multiple :filterable="filterable" :collapse-tags="collapse" collapse-tags-tooltip :max-collapse-tags="maxCollapseTags" :disabled="disabled" :loading="loading" class="demo-wide" />
      <BaseSelect v-else v-model="single" :options="groups" :filterable="filterable" :disabled="disabled" :loading="loading" class="demo-wide" />
    </BaseFormItem>
    <template #controls>
      <BaseCheckbox v-model="multiple" label="多选" show-label />
      <BaseCheckbox v-model="filterable" label="可搜索" show-label />
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
      <BaseCheckbox v-model="loading" label="加载中" show-label />
      <template v-if="multiple">
        <BaseCheckbox v-model="collapse" label="折叠标签" show-label />
        <div v-if="collapse" class="demo-control">
          <span>可见标签</span>
          <BaseNumberInput v-model="maxCollapseTags" label="可见标签数量" :min="1" :max="4" />
        </div>
      </template>
    </template>
  </DemoPlayground>
</template>
