<script setup lang="ts">
import SliderDemo from '../examples/SliderDemo.vue'
</script>

# Slider 滑块

连续调节数值，支持键盘操作、步长和禁用状态

## 交互示例

<ClientOnly>
  <SliderDemo />
</ClientOnly>

## 使用要点

`v-model` 绑定数值，`min`、`max`、`step` 定义可选范围

通过 `aria-label` 说明调节用途，`unit` 补充读屏数值单位，`disabled` 禁用交互

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZSlider } from '@codex-proxy/ui'
import { ref } from 'vue'

const opacity = ref(60)
</script>

<template>
  <ZSlider v-model="opacity" aria-label="透明度" :min="0" :max="100" :step="5" unit="%" />
</template>
```

:::

## API

### 属性

| 属性         | 类型      | 默认值    | 说明                         |
| ------------ | --------- | --------- | ---------------------------- |
| `v-model`    | `number`  | 必填      | 当前数值                     |
| `aria-label` | `string`  | `'数值'`  | 可访问名称，建议填写具体用途 |
| `min / max`  | `number`  | `0 / 100` | 数值范围                     |
| `step`       | `number`  | `1`       | 步长                         |
| `unit`       | `string`  | —         | 辅助技术读取的数值单位       |
| `disabled`   | `boolean` | `false`   | 禁止修改                     |

### 事件

| 事件                | 说明                       |
| ------------------- | -------------------------- |
| `update:modelValue` | number，绑定值变化         |
| `input`             | number，用户调节中的数值   |
| `change`            | number，原生控件提交的数值 |
| `focus / blur`      | FocusEvent，焦点变化       |

### 实例

`focus()`、`blur()` 控制原生滑块焦点
