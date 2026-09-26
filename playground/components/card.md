<script setup lang="ts">
import CardDemo from '../examples/CardDemo.vue'
</script>

# Card 卡片

组织同一主题的标题、说明与内容

## 交互示例

<ClientOnly>
  <CardDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseCard } from '@codex-proxy/ui'
</script>

<template>
  <BaseCard title="请求工作台" description="管理页面与请求中间件">
    <p>将相关内容放在同一张卡片中</p>
  </BaseCard>
</template>
```

:::

## 使用要点

`padding` 控制内容间距，`actions` 插槽承载卡片操作

## API

### 属性

| 属性                  | 类型                               | 默认值      | 说明       |
| --------------------- | ---------------------------------- | ----------- | ---------- |
| `as`                  | `keyof HTMLElementTagNameMap`      | `'section'` | 根元素标签 |
| `padding`             | `'none' \| 'compact' \| 'default'` | `'default'` | 内容间距   |
| `title / description` | `string`                           | —           | 标题与说明 |

### 插槽

| 插槽                  | 说明                |
| --------------------- | ------------------- |
| `default / body`      | 主体内容，body 优先 |
| `title / description` | 替换标题或说明文字  |
| `actions`             | 标题右侧操作        |
| `header`              | 替换整个头部        |
