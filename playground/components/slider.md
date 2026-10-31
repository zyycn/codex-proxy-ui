<script setup lang="ts">
import SliderDemo from '../examples/SliderDemo.vue'
</script>

# Slider 滑块

连续调节数值，支持键盘操作、步长和禁用状态

## 基础用法

<DemoExample>

<ClientOnly>
  <SliderDemo />
</ClientOnly>

<template #source>

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

</template>

</DemoExample>

## 用法说明

`v-model` 绑定数值，`min`、`max`、`step` 定义可选范围

通过 `aria-label` 说明调节用途，`unit` 补充读屏数值单位，`disabled` 禁用交互

## Slider API {#api}

### 属性

| 属性         | 说明                         | 类型      | 默认值    |
| ------------ | ---------------------------- | --------- | --------- |
| `v-model`    | 当前数值                     | `number`  | 必填      |
| `aria-label` | 可访问名称，建议填写具体用途 | `string`  | `'数值'`  |
| `min / max`  | 数值范围                     | `number`  | `0 / 100` |
| `step`       | 步长                         | `number`  | `1`       |
| `unit`       | 辅助技术读取的数值单位       | `string`  | —         |
| `disabled`   | 禁止修改                     | `boolean` | `false`   |

### 事件

| 事件                | 说明                       |
| ------------------- | -------------------------- |
| `update:modelValue` | number，绑定值变化         |
| `input`             | number，用户调节中的数值   |
| `change`            | number，原生控件提交的数值 |
| `focus / blur`      | FocusEvent，焦点变化       |

### 实例

`focus()`、`blur()` 控制原生滑块焦点
