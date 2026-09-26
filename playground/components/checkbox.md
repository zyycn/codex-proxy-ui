<script setup lang="ts">
import CheckboxDemo from '../examples/CheckboxDemo.vue'
</script>

# Checkbox 复选框

独立选择一个选项，也可呈现半选状态

## 交互示例

<ClientOnly>
  <CheckboxDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <BaseCheckbox v-model="checked" label="允许修改响应头" show-label />
</template>
```

:::

## 使用要点

`v-model` 绑定布尔值，`indeterminate` 仅表示半选外观

## API

### 属性

| 属性            | 类型      | 默认值  | 说明                   |
| --------------- | --------- | ------- | ---------------------- |
| `v-model`       | `boolean` | `false` | 选中状态               |
| `label`         | `string`  | 必填    | 可访问名称             |
| `showLabel`     | `boolean` | `false` | 显示名称文字           |
| `indeterminate` | `boolean` | `false` | 半选外观，不改写绑定值 |
| `disabled`      | `boolean` | `false` | 禁止修改               |

### 事件

| 事件                | 说明                |
| ------------------- | ------------------- |
| `update:modelValue` | boolean，绑定值变化 |
