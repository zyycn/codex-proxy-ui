<script setup lang="ts">
import TextareaDemo from '../examples/TextareaDemo.vue'
</script>

# Textarea 文本域

输入多行说明与较长文本

## 交互示例

<ClientOnly>
  <TextareaDemo />
</ClientOnly>

::: details 查看用法代码

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

:::

## 使用要点

`rows` 控制初始行数，`resize` 控制允许拖动的方向

## API

### 属性

| 属性          | 类型                                                | 默认值       | 说明                             |
| ------------- | --------------------------------------------------- | ------------ | -------------------------------- |
| `v-model`     | `string`                                            | `''`         | 字符串值                         |
| `placeholder` | `string`                                            | `''`         | 占位文字                         |
| `size`        | `'small' \| 'default' \| 'large'`                   | `'default'`  | 组件尺寸                         |
| `rows`        | `number`                                            | `5`          | 初始行数和 autosize 默认最小行数 |
| `autosize`    | `boolean \| { minRows?: number, maxRows?: number }` | `false`      | 随内容与宽度调整高度             |
| `resize`      | `'none' \| 'both' \| 'horizontal' \| 'vertical'`    | `'vertical'` | 拖动方向，autosize 时关闭拖动    |
| `disabled`    | `boolean`                                           | `false`      | 禁用输入                         |

原生属性与 ARIA 属性传给 textarea，外层接收 class、style。输入法组合完成后更新模型

### 事件与实例

- `update:modelValue / input / change(value: string)`：模型、输入与提交变化
- `focus / blur(event: FocusEvent)`：焦点变化
- 实例：`focus()`、`blur()`、`select()`、`clear()`
