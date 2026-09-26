<script setup lang="ts">
import MarkdownDemo from '../examples/MarkdownDemo.vue'
</script>

# Markdown 内容

呈现说明与文档内容，复用统一的 Markdown 渲染边界

## 交互示例

<ClientOnly>
  <MarkdownDemo />
</ClientOnly>

## 使用要点

通过 `source` 传入文本，不把未经处理的 HTML 直接注入页面

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseMarkdown } from '@codex-proxy/ui'

const source = '### 请求工作台\n\n通过 **显式授权** 使用插件能力'
</script>

<template>
  <BaseMarkdown :source="source" />
</template>
```

:::

## API

### 属性

| 属性     | 类型             | 默认值 | 说明                          |
| -------- | ---------------- | ------ | ----------------------------- |
| `source` | `string \| null` | —      | Markdown 文本，空值显示空内容 |
