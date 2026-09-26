<script setup lang="ts">
import { BaseForm, BaseFormItem, BaseInput, BaseNumberInput, BaseTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const name = ref('请求工作台')
const order = ref(0)
const description = ref('为指定请求添加响应标记')
</script>

<template>
  <DemoPlayground wide>
    <BaseForm>
      <div class="demo-columns">
        <BaseFormItem label="配置名称" required>
          <BaseInput v-model="name" placeholder="填写名称" />
        </BaseFormItem>
        <BaseFormItem label="执行顺序">
          <BaseNumberInput v-model="order" label="执行顺序" :min="0" size="md" class="demo-wide" />
        </BaseFormItem>
      </div>
      <BaseFormItem label="说明">
        <BaseTextarea v-model="description" :rows="3" />
      </BaseFormItem>
    </BaseForm>
  </DemoPlayground>
</template>
