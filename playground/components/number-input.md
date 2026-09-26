<script setup lang="ts">
import NumberInputDemo from '../examples/NumberInputDemo.vue'
</script>

# NumberInput 数字输入

通过输入或步进调整数值

## 交互示例

<ClientOnly>
  <NumberInputDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseNumberInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(10)
</script>

<template>
  <BaseNumberInput v-model="count" label="并发数量" :min="1" :max="100" :step="1" />
</template>
```

:::

## 使用要点

`min`、`max` 限制范围，`step` 控制步长，`label` 描述数值含义

## API

### 属性

| 属性        | 类型           | 默认值  | 说明                         |
| ----------- | -------------- | ------- | ---------------------------- |
| `v-model`   | `number`       | 必填    | 当前数值                     |
| `label`     | `string`       | 必填    | 输入框与增减按钮的可访问名称 |
| `min / max` | `number`       | —       | 上下界                       |
| `step`      | `number`       | `1`     | 按钮步进值                   |
| `unit`      | `string`       | —       | 尾部单位                     |
| `size`      | `'sm' \| 'md'` | `'sm'`  | 尺寸                         |
| `disabled`  | `boolean`      | `false` | 禁用输入与增减               |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | number，绑定值变化 |
