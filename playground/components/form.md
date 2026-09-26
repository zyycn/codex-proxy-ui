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
import { BaseButton, BaseForm, BaseFormItem, BaseInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const name = ref('')
const error = ref('')
const result = ref('')

function save() {
  error.value = name.value.trim() ? '' : '请填写配置名称'
  result.value = error.value ? '' : `已保存：${name.value.trim()}`
}
</script>

<template>
  <BaseForm @submit="save">
    <BaseFormItem label="配置名称" required :error="error">
      <BaseInput v-model="name" />
    </BaseFormItem>
    <BaseButton type="submit" variant="primary">
      保存
    </BaseButton>
    <output aria-label="保存结果">{{ result }}</output>
  </BaseForm>
</template>
```

:::

## 使用要点

`BaseFormItem` 负责关联控件与标签，通过 `required`、`description`、`error` 表达字段约束

## API

### 属性

`BaseForm` 接收原生 form 属性，下面的属性属于 `BaseFormItem`

| 属性                          | 类型      | 默认值   | 说明                                                |
| ----------------------------- | --------- | -------- | --------------------------------------------------- |
| `label / description / error` | `string`  | —        | BaseFormItem 的标签、帮助与错误                     |
| `required`                    | `boolean` | `false`  | BaseFormItem 的必填标记和 ARIA 提示，不代替业务校验 |
| `controlId`                   | `string`  | 自动生成 | BaseFormItem 关联的控件 ID                          |

### 事件

| 事件               | 说明                                       |
| ------------------ | ------------------------------------------ |
| `BaseForm @submit` | 原生 SubmitEvent，组件已阻止浏览器默认提交 |

### 插槽

| 插槽                               | 说明                       |
| ---------------------------------- | -------------------------- |
| `BaseForm.default`                 | 表单字段与操作             |
| `BaseFormItem.default`             | 关联的表单控件             |
| `BaseFormItem.label`               | 替换标签内容               |
| `BaseFormItem.label-extra / extra` | 标签后的补充内容或右侧操作 |
