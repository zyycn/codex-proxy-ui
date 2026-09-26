<script setup lang="ts">
import RangeDemo from '../examples/RangeDemo.vue'
</script>

# Range 滑块

连续调节数值，支持键盘操作、步长和禁用状态

## 交互示例

<ClientOnly>
  <RangeDemo />
</ClientOnly>

## 使用要点

`v-model` 绑定数值，`min`、`max`、`step` 定义可选范围

`label` 是必填的可访问名称，`unit` 补充读屏数值单位，`disabled` 禁用交互

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseRange } from '@codex-proxy/ui'
import { ref } from 'vue'

const opacity = ref(60)
</script>

<template>
  <BaseRange v-model="opacity" label="透明度" :min="0" :max="100" :step="5" unit="%" />
</template>
```

:::

## API

### 属性

| 属性        | 类型      | 默认值    | 说明                   |
| ----------- | --------- | --------- | ---------------------- |
| `v-model`   | `number`  | 必填      | 当前数值               |
| `label`     | `string`  | 必填      | 可访问名称             |
| `min / max` | `number`  | `0 / 100` | 数值范围               |
| `step`      | `number`  | `1`       | 步长                   |
| `unit`      | `string`  | —         | 辅助技术读取的数值单位 |
| `disabled`  | `boolean` | `false`   | 禁止修改               |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | number，绑定值变化 |
