<script setup lang="ts">
import PageHeaderDemo from '../examples/PageHeaderDemo.vue'
</script>

# PageHeader 页头

统一页面标题、副标题与右侧操作区

## 交互示例

<ClientOnly>
  <PageHeaderDemo />
</ClientOnly>

## 使用要点

`title` 定义页面主标题，`description` 提供简短说明，`actions` 插槽放置操作按钮

组件使用一级标题，实际页面通常只放置一个页头

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BasePageHeader } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <BasePageHeader title="配置管理" :description="`已刷新 ${count} 次`">
    <template #actions>
      <BaseButton @click="count++">
        刷新
      </BaseButton>
    </template>
  </BasePageHeader>
</template>
```

:::

## API

### 属性

| 属性          | 类型     | 默认值 | 说明     |
| ------------- | -------- | ------ | -------- |
| `title`       | `string` | 必填   | 页面标题 |
| `description` | `string` | —      | 辅助说明 |

### 插槽

| 插槽          | 说明         |
| ------------- | ------------ |
| `description` | 替换说明内容 |
| `actions`     | 页头操作     |
