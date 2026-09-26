<script setup lang="ts">
import InputDemo from '../examples/InputDemo.vue'
</script>

# Input 输入框

输入单行文本，支持前后插槽与表单校验

## 交互示例

<ClientOnly>
  <InputDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseFormItem, BaseInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <BaseFormItem label="配置名称" required>
    <BaseInput v-model="name" placeholder="填写名称" />
  </BaseFormItem>
</template>
```

:::

## 使用要点

通过 `v-model` 绑定字符串，使用 `BaseFormItem` 关联标签与错误信息

## API

### 属性

| 属性          | 类型                   | 默认值   | 说明         |
| ------------- | ---------------------- | -------- | ------------ |
| `v-model`     | `string`               | `''`     | 输入值       |
| `type`        | `string`               | `'text'` | 原生输入类型 |
| `placeholder` | `string`               | `''`     | 占位文字     |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`   | 尺寸         |
| `disabled`    | `boolean`              | `false`  | 禁用输入     |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | string，绑定值变化 |

### 插槽

| 插槽              | 说明           |
| ----------------- | -------------- |
| `prefix / suffix` | 前置或后置内容 |
