<script setup lang="ts">
import FormDemo from '../examples/FormDemo.vue'
</script>

# Form 表单

组合相关字段，统一标签、说明与校验状态

## 交互示例

<ClientOnly>
  <FormDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import type { FormInstance, FormRules } from '@codex-proxy/ui'
import { ZButton, ZForm, ZFormItem, ZInput, ZInputNumber, ZTextarea } from '@codex-proxy/ui'
import { reactive, ref, useTemplateRef } from 'vue'

const form = useTemplateRef<FormInstance>('form')
const model = reactive({ name: '请求工作台', order: 0, description: '为指定请求添加响应标记' })
const result = ref('')
const rules: FormRules = { name: { required: true, message: '请填写配置名称', trigger: 'blur' } }
async function save() {
  const valid = await form.value?.validate()
  result.value = valid ? `已保存：${model.name}` : '请完善必填项'
  if (!valid)
    form.value?.focusField('name')
}
</script>

<template>
  <ZForm ref="form" :model="model" :rules="rules" novalidate @submit="save">
    <div style="display: grid; gap: 20px">
      <ZFormItem prop="name" label="配置名称">
        <ZInput v-model="model.name" placeholder="填写名称" clearable />
      </ZFormItem>
      <ZFormItem prop="order" label="执行顺序">
        <ZInputNumber v-model="model.order" aria-label="执行顺序" :min="0" style="width: 100%" />
      </ZFormItem>
    </div>
    <ZFormItem prop="description" label="说明">
      <ZTextarea v-model="model.description" :autosize="{ minRows: 2, maxRows: 5 }" />
    </ZFormItem>
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <ZButton type="primary" native-type="submit">
        校验并保存
      </ZButton>
      <ZButton @click="form?.clearValidate()">
        清空校验
      </ZButton>
    </div>
    <output aria-label="保存结果">{{ result }}</output>
  </ZForm>
</template>
```

:::

## 使用要点

`ZFormItem` 负责关联控件与标签，通过 `required`、`description`、`error` 表达字段约束

## API

### ZForm

| 属性    | 类型        | 默认值 | 说明                 |
| ------- | ----------- | ------ | -------------------- |
| `model` | `object`    | —      | 校验读取的业务模型   |
| `rules` | `FormRules` | —      | 按字段路径配置的规则 |

原生 form 属性透传，submit 阻止浏览器默认提交。默认插槽放置字段和操作

`FormRule` 支持 required、message、trigger（change、blur 或数组）与 validator。validator 接收字段值和整个模型，可返回错误字符串或 Promise；返回 void 表示通过，抛错表示失败。表单不执行保存、不重置业务草稿

### ZFormItem

| 属性                          | 类型      | 默认值   | 说明                                             |
| ----------------------------- | --------- | -------- | ------------------------------------------------ |
| `prop`                        | `string`  | —        | 模型字段路径，支持点分路径                       |
| `for`                         | `string`  | 自动生成 | 标签关联的控件 ID；显式控件 id 会同步到标签      |
| `label / description / error` | `string`  | —        | 标签、帮助与外部错误；外部错误优先               |
| `required`                    | `boolean` | `false`  | 必填标记，支持原生 required 的控件也收到必填属性 |

插槽：default、label、label-extra、extra。一个 FormItem 对应一个字段，辅助按钮放在 label-extra 或 extra

错误提示定位在控件下方，不撑开字段和表单；字段之间保留至少 20px 间距，ZForm 默认提供此间距。错误态沿用正常的悬停、聚焦与失焦行为，只有交互期间显示错误外圈。长错误保持单行，完整内容通过 title 与 aria-describedby 提供

### 实例

| 方法                                       | 合同                             |
| ------------------------------------------ | -------------------------------- |
| `validate()`                               | `Promise<boolean>`，校验全部字段 |
| `validateField(prop: string \| string[])`  | `Promise<boolean>`，校验指定字段 |
| `clearValidate(prop?: string \| string[])` | 清空全部或指定字段的组件错误     |
| `scrollToField(prop)`                      | 滚动到字段                       |
| `focusField(prop)`                         | 聚焦实际控件                     |

后一次校验、clearValidate 和字段卸载使之前的异步结果失效。clearValidate 不修改调用方提供的 error。FormItem 实例提供 validate、clearValidate、focus、scrollIntoView
