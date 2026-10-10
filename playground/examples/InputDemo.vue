<script setup lang="ts">
import { ZCheckbox, ZFormItem, ZInput, ZSegmented } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const value = ref('请求工作台')
const size = ref<'small' | 'default' | 'large'>('default')
const disabled = ref(false)
const invalid = ref(false)
const clearable = ref(true)
const password = ref(false)
const sizes = [{ label: '小', value: 'small' }, { label: '中', value: 'default' }, { label: '大', value: 'large' }]
</script>

<template>
  <DemoPlayground>
    <ZFormItem label="配置名称" :error="invalid ? '请填写有效名称' : undefined">
      <ZInput v-model="value" :size="size" :disabled="disabled" :clearable="clearable" :show-password="password" placeholder="填写名称" />
    </ZFormItem>
    <template #controls>
      <div class="demo-control">
        <span>尺寸</span>
        <ZSegmented v-model="size" :options="sizes" aria-label="组件尺寸" size="small" />
      </div>
      <ZCheckbox v-model="disabled" label="禁用" />
      <ZCheckbox v-model="invalid" label="校验错误" />
      <ZCheckbox v-model="clearable" label="可清空" />
      <ZCheckbox v-model="password" label="密码显隐" />
    </template>
  </DemoPlayground>
</template>
