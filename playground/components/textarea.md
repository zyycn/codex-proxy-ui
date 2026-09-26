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
import { BaseFormItem, BaseTextarea } from '@codex-proxy/ui'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <BaseFormItem label="配置说明">
    <BaseTextarea v-model="description" :rows="3" placeholder="补充说明" />
  </BaseFormItem>
</template>
```

:::

## 使用要点

`rows` 控制初始行数，`resize` 控制允许拖动的方向

## API

### 属性

| 属性          | 类型                                             | 默认值       | 说明         |
| ------------- | ------------------------------------------------ | ------------ | ------------ |
| `v-model`     | `string`                                         | `''`         | 输入值       |
| `rows`        | `number`                                         | `5`          | 显示行数     |
| `resize`      | `'none' \| 'both' \| 'horizontal' \| 'vertical'` | `'vertical'` | 拖拽调整方向 |
| `size`        | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | 尺寸         |
| `placeholder` | `string`                                         | `''`         | 占位文字     |
| `disabled`    | `boolean`                                        | `false`      | 禁用输入     |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | string，绑定值变化 |
