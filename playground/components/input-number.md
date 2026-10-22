<script setup lang="ts">
import InputNumberDemo from '../examples/InputNumberDemo.vue'
</script>

# InputNumber 数字输入

通过输入或步进调整数值

## 交互示例

<ClientOnly>
  <InputNumberDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZInputNumber } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(10)
</script>

<template>
  <ZInputNumber v-model="count" aria-label="并发数量" :min="1" :max="100" :step="1" />
</template>
```

:::

## 使用要点

默认宽度 `150px`，`small` 为 `120px`，可通过 `class / style` 覆盖

`min`、`max` 限制范围，`step` 控制步长，`aria-label` 提供数值含义的可访问名称

## API

### 属性

| 属性                  | 类型                   | 默认值      | 说明                               |
| --------------------- | ---------------------- | ----------- | ---------------------------------- |
| `v-model`             | `number`               | 必填        | 有限数值，暂时清空输入不提交空值   |
| `min / max`           | `number`               | —           | 提交和步进的边界                   |
| `step`                | `number`               | `1`         | 步进值，支持小数与科学计数法       |
| `precision`           | `number`               | —           | 0–100 的整数，提交时保留的小数位数 |
| `controls`            | `boolean`              | `true`      | 显示步进按钮                       |
| `disabled / readonly` | `boolean`              | `false`     | 禁止编辑和步进                     |
| `unit`                | `string`               | —           | 显示单位                           |
| `size`                | `'small' \| 'default'` | `'default'` | 组件尺寸                           |
| `aria-label`          | `string`               | `'数值'`    | 可访问名称                         |

输入草稿在原生 change 或 blur 时提交，空草稿恢复原值。提交先按 precision 舍入，再限制到 min/max；程序赋值由调用方保证符合合同

### 事件与实例

- `update:modelValue / change(value: number)`：提交或步进产生的数值变化
- `input(value: string)`：编辑中的原生草稿，可能为空
- `focus / blur(event: FocusEvent)`：焦点变化
- 实例：`focus()`、`blur()`
