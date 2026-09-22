<script setup lang="ts">
import { BaseForm, BaseFormItem, BaseInput, BaseNumberInput, BaseSelect, BaseTag } from '@codex-proxy/ui'
import { shallowRef } from 'vue'

const name = shallowRef('请求工作台')
const order = shallowRef(0)
const status = shallowRef('enabled')
const options = [{ label: '已启用', value: 'enabled' }, { label: '已停用', value: 'disabled' }]
</script>

<template>
  <section aria-label="表单控件" class="rounded-cp-card bg-cp-bg-container p-5">
    <h2 class="mb-4 mt-0 text-cp-lg font-emphasis">
      配置
    </h2>
    <BaseForm>
      <BaseFormItem label="配置名称" required>
        <BaseInput v-model="name" placeholder="填写名称" />
      </BaseFormItem>
      <div class="grid gap-4 sm:grid-cols-2">
        <BaseFormItem label="执行顺序">
          <BaseNumberInput v-model="order" label="执行顺序" size="md" :min="0" class="w-full" />
        </BaseFormItem>
        <BaseFormItem label="状态">
          <BaseSelect v-model="status" :options="options" class="w-full" />
        </BaseFormItem>
      </div>
      <div class="flex flex-wrap gap-2">
        <BaseTag>管理页面</BaseTag>
        <BaseTag>请求中间件</BaseTag>
      </div>
    </BaseForm>
  </section>
</template>
