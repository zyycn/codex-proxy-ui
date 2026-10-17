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

:::

## 使用要点

默认宽度为容器的 `100%`，可通过 `class / style` 指定宽度；示例容器宽 `240px`

通过 `v-model` 绑定字符串，使用 `ZFormItem` 关联标签与错误信息

`clearable` 在有内容且可编辑时提供清空图标，悬停或聚焦时显示；清空后保持输入焦点。清空与密码显隐使用紧凑图标操作

## API

### 属性

| 属性                                   | 类型                              | 默认值      | 说明                         |
| -------------------------------------- | --------------------------------- | ----------- | ---------------------------- |
| `v-model`                              | `string`                          | `''`        | 字符串值                     |
| `type`                                 | `string`                          | `'text'`    | 原生输入类型                 |
| `placeholder`                          | `string`                          | `''`        | 占位文字                     |
| `size`                                 | `'small' \| 'default' \| 'large'` | `'default'` | 组件尺寸                     |
| `disabled / clearable / show-password` | `boolean`                         | `false`     | 禁用、清空按钮、密码显隐按钮 |

`id`、`name`、`required`、`readonly`、`autocomplete`、ARIA 属性传给实际 input；`class`、`style` 作用于外层。输入法组合期间保留草稿，组合完成后更新模型

### 事件、插槽与实例

- `update:modelValue(value: string)`：模型更新
- `input(value: string)`：有效输入或清空
- `change(value: string)`：原生 change 或清空
- `clear()`：用户清空
- `focus / blur(event: FocusEvent)`：原生焦点事件
- 插槽：`prefix`、`suffix`
- 实例：`focus()`、`blur()`、`select()`、`clear()`
