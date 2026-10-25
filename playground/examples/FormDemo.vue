<script setup lang="ts">
import type { FormInstance, FormLabelPosition, FormRules } from '@codex-proxy/ui'
import { ZButton, ZForm, ZFormItem, ZInput, ZInputNumber, ZSegmented, ZTextarea } from '@codex-proxy/ui'
import { reactive, ref, useTemplateRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

interface RuleForm { name: string, order: number, description: string }
const form = useTemplateRef<FormInstance>('form')
const model = reactive<RuleForm>({ name: '请求工作台', order: 0, description: '为指定请求添加响应标记' })
const result = ref('')
const labelPosition = ref<FormLabelPosition>('right')
const itemLabelPosition = ref<FormLabelPosition | ''>('')
const positions = [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }, { label: 'Top', value: 'top' }]
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请填写配置名称', trigger: 'blur' },
    { min: 3, max: 12, message: '名称长度为 3 到 12 个字符', trigger: 'blur' },
  ],
  order: { type: 'integer', min: 0, message: '执行顺序必须为非负整数', trigger: 'change' },
})
async function save() {
  const valid = await form.value?.validate().catch(() => false)
  result.value = valid ? `已保存：${model.name}` : ''
}
function reset() {
  form.value?.resetFields()
  result.value = ''
}
</script>

<template>
  <DemoPlayground wide>
    <div class="demo-stack w-full">
      <div class="demo-row">
        <span>Form Align</span>
        <ZSegmented v-model="labelPosition" aria-label="表单标签位置" :options="positions" />
      </div>
      <div class="demo-row">
        <span>Form Item Align</span>
        <ZSegmented v-model="itemLabelPosition" aria-label="配置名称标签位置" :options="[{ label: '继承', value: '' }, ...positions]" />
      </div>
      <ZForm ref="form" :model="model" :rules="rules" :label-position="labelPosition" label-width="auto" scroll-to-error focus-on-error novalidate @submit="save">
        <ZFormItem prop="name" label="配置名称" :label-position="itemLabelPosition">
          <ZInput v-model="model.name" placeholder="填写名称" clearable />
        </ZFormItem>
        <ZFormItem prop="order" label="执行顺序">
          <ZInputNumber v-model="model.order" aria-label="执行顺序" :min="0" class="demo-wide" />
        </ZFormItem>
        <ZFormItem prop="description" label="说明">
          <ZTextarea v-model="model.description" :autosize="{ minRows: 2, maxRows: 5 }" />
        </ZFormItem>
        <div class="demo-row">
          <ZButton type="primary" native-type="submit">
            校验并保存
          </ZButton>
          <ZButton @click="reset">
            重置
          </ZButton>
          <ZButton @click="form?.clearValidate()">
            清空校验
          </ZButton>
        </div>
        <output v-if="result" aria-label="保存结果">{{ result }}</output>
      </ZForm>
    </div>
  </DemoPlayground>
</template>
