<script setup lang="ts">
import InputDemo from '../examples/InputDemo.vue'
</script>

# Input 输入框

输入单行文本，支持前后插槽与表单校验

## 基础用法

<DemoExample>

<ClientOnly>
  <InputDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZFormItem, ZInput } from '@codex-proxy/ui'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <ZFormItem label="配置名称" required>
    <ZInput v-model="name" placeholder="填写名称" />
  </ZFormItem>
</template>
```

</template>

</DemoExample>

## 用法说明

默认宽度为容器的 `100%`，可通过 `class / style` 指定宽度；示例容器宽 `240px`

通过 `v-model` 绑定字符串，使用 `ZFormItem` 关联标签与错误信息

`clearable` 在有内容且可编辑时提供清空图标，悬停或聚焦时显示；清空后保持输入焦点。清空与密码显隐使用紧凑图标操作

## Input API {#api}

### 属性

| 属性                                   | 说明                         | 类型                              | 默认值      |
| -------------------------------------- | ---------------------------- | --------------------------------- | ----------- |
| `v-model`                              | 字符串值                     | `string`                          | `''`        |
| `type`                                 | 原生输入类型                 | `string`                          | `'text'`    |
| `placeholder`                          | 占位文字                     | `string`                          | `''`        |
| `size`                                 | 组件尺寸                     | `'small' \| 'default' \| 'large'` | `'default'` |
| `disabled / clearable / show-password` | 禁用、清空按钮、密码显隐按钮 | `boolean`                         | `false`     |

`id`、`name`、`required`、`readonly`、`autocomplete`、ARIA 属性传给实际 input；`class`、`style` 作用于外层。输入法组合期间保留草稿，组合完成后更新模型

### 事件

- `update:modelValue(value: string)`：模型更新
- `input(value: string)`：有效输入或清空
- `change(value: string)`：原生 change 或清空
- `clear()`：用户清空
- `focus / blur(event: FocusEvent)`：原生焦点事件

### 插槽

`prefix`、`suffix`

### 实例

`focus()`、`blur()`、`select()`、`clear()`
