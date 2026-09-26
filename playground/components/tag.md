<script setup lang="ts">
import TagDemo from '../examples/TagDemo.vue'
</script>

# Tag 标签

用短标签呈现状态与分类

## 交互示例

<ClientOnly>
  <TagDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BaseTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <BaseTag v-if="visible" type="success" closable @close="visible = false">
    已启用
  </BaseTag>
  <BaseButton v-else @click="visible = true">
    恢复标签
  </BaseButton>
</template>
```

:::

## 使用要点

`closable` 发出关闭事件，由调用方决定是否移除标签

## API

### 属性

| 属性                          | 类型                                                                     | 默认值      | 说明                                     |
| ----------------------------- | ------------------------------------------------------------------------ | ----------- | ---------------------------------------- |
| `type`                        | `'neutral' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'neutral'` | 状态样式                                 |
| `size`                        | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`      | 尺寸                                     |
| `round / closable / disabled` | `boolean`                                                                | `false`     | 圆角、关闭按钮与禁用状态                 |
| `closeLabel`                  | `string`                                                                 | —           | 关闭按钮名称，默认由“移除”和标签内容组合 |

### 事件

| 事件    | 说明                                     |
| ------- | ---------------------------------------- |
| `close` | MouseEvent，只通知关闭，由调用方移除标签 |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 标签内容 |
