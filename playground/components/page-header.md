<script setup lang="ts">
import PageHeaderDemo from '../examples/PageHeaderDemo.vue'
</script>

# PageHeader 页头

统一页面标题、副标题与右侧操作区

## 基础用法

<DemoExample>

<ClientOnly>
  <PageHeaderDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZButton, ZPageHeader } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZPageHeader title="配置管理" :description="`已刷新 ${count} 次`">
    <template #actions>
      <ZButton @click="count++">
        刷新
      </ZButton>
    </template>
  </ZPageHeader>
</template>
```

</template>

</DemoExample>

## 用法说明

`title` 定义页面主标题，`description` 提供简短说明，`actions` 插槽放置操作按钮

组件使用一级标题，实际页面通常只放置一个页头

## PageHeader API {#api}

### 属性

| 属性          | 说明     | 类型     | 默认值 |
| ------------- | -------- | -------- | ------ |
| `title`       | 页面标题 | `string` | 必填   |
| `description` | 辅助说明 | `string` | —      |

### 插槽

| 插槽          | 说明         |
| ------------- | ------------ |
| `description` | 替换说明内容 |
| `actions`     | 页头操作     |
