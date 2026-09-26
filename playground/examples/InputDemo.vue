<script setup lang="ts">
import { BaseCheckbox, BaseFormItem, BaseInput, BaseSegmented } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref('请求工作台')
const size = ref<'sm' | 'md' | 'lg'>('md')
const disabled = ref(false)
const invalid = ref(false)
const sizes = [{ label: '小', value: 'sm' }, { label: '中', value: 'md' }, { label: '大', value: 'lg' }]
</script>

<template>
  <DemoPlayground>
    <BaseFormItem label="配置名称" :error="invalid ? '请填写有效名称' : undefined">
      <BaseInput v-model="value" :size="size" :disabled="disabled" placeholder="填写名称" />
    </BaseFormItem>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <BaseSegmented v-model="size" :options="sizes" label="组件尺寸" size="sm" />
      </div>
      <BaseCheckbox v-model="disabled" label="禁用" show-label />
      <BaseCheckbox v-model="invalid" label="校验错误" show-label />
    </template>
  </DemoPlayground>
</template>
