<script setup lang="ts">
import type { FormInstance, FormRules } from '@codex-proxy/ui'
import { ZButton, ZForm, ZFormItem, ZInput, ZInputNumber, ZTextarea } from '@codex-proxy/ui'
import { reactive, ref, useTemplateRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const form = useTemplateRef<FormInstance>('form')
const model = reactive({ name: '请求工作台', order: 0, description: '为指定请求添加响应标记' })
const result = ref('')
const rules: FormRules = { name: { required: true, message: '请填写配置名称', trigger: 'blur' } }
async function save() {
  const valid = await form.value?.validate()
  result.value = valid ? `已保存：${model.name}` : ''
  if (!valid)
    form.value?.focusField('name')
}
</script>

<template>
  <DemoPlayground wide>
    <ZForm ref="form" :model="model" :rules="rules" novalidate @submit="save">
      <div class="demo-columns gap-5!">
        <ZFormItem prop="name" label="配置名称">
          <ZInput v-model="model.name" placeholder="填写名称" clearable />
        </ZFormItem>
        <ZFormItem prop="order" label="执行顺序">
          <ZInputNumber v-model="model.order" aria-label="执行顺序" :min="0" class="demo-wide" />
        </ZFormItem>
      </div>
      <ZFormItem prop="description" label="说明">
        <ZTextarea v-model="model.description" :autosize="{ minRows: 2, maxRows: 5 }" />
      </ZFormItem>
      <div class="demo-row">
        <ZButton type="primary" native-type="submit">
          校验并保存
        </ZButton>
        <ZButton @click="form?.clearValidate()">
          清空校验
        </ZButton>
      </div>
      <output v-if="result" aria-label="保存结果">{{ result }}</output>
    </ZForm>
  </DemoPlayground>
</template>
