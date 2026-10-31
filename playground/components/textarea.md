<script setup lang="ts">
import TextareaDemo from '../examples/TextareaDemo.vue'
</script>

# Textarea 文本域

输入多行说明与较长文本

## 基础用法

<DemoExample>

<ClientOnly>
  <TextareaDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZFormItem, ZTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <ZFormItem label="配置说明">
    <ZTextarea v-model="description" :rows="3" placeholder="补充说明" />
  </ZFormItem>
</template>
```

</template>

</DemoExample>

## 用法说明

默认宽度为容器的 `100%`，可通过 `class / style` 指定宽度

`rows` 控制初始行数，`resize` 控制允许拖动的方向

## Textarea API {#api}

### 属性

| 属性          | 说明                             | 类型                                                | 默认值       |
| ------------- | -------------------------------- | --------------------------------------------------- | ------------ |
| `v-model`     | 字符串值                         | `string`                                            | `''`         |
| `placeholder` | 占位文字                         | `string`                                            | `''`         |
| `size`        | 组件尺寸                         | `'small' \| 'default' \| 'large'`                   | `'default'`  |
| `rows`        | 初始行数和 autosize 默认最小行数 | `number`                                            | `5`          |
| `autosize`    | 随内容与宽度调整高度             | `boolean \| { minRows?: number, maxRows?: number }` | `false`      |
| `resize`      | 拖动方向，autosize 时关闭拖动    | `'none' \| 'both' \| 'horizontal' \| 'vertical'`    | `'vertical'` |
| `disabled`    | 禁用输入                         | `boolean`                                           | `false`      |

原生属性与 ARIA 属性传给 textarea，外层接收 class、style。输入法组合完成后更新模型

### 事件

- `update:modelValue / input / change(value: string)`：模型、输入与提交变化
- `focus / blur(event: FocusEvent)`：焦点变化

### 实例

`focus()`、`blur()`、`select()`、`clear()`
