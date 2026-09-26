<script setup lang="ts">
import MotionIconDemo from '../examples/MotionIconDemo.vue'
</script>

# MotionIcon 动效图标

为插槽中的图标增加指针反馈，不改变图标来源与尺寸

## 交互示例

<ClientOnly>
  <MotionIconDemo />
</ClientOnly>

## 使用要点

`variant` 支持默认的 `random` 与 `brand`，`as` 指定外层 HTML 元素

组件响应系统的减少动态效果偏好，纯装饰图标可设置 `aria-hidden`，交互操作请配合有名称的按钮使用

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseMotionIcon } from '@codex-proxy/ui'
</script>

<template>
  <BaseMotionIcon variant="brand" aria-label="品牌图标" style="display: inline-grid; padding: 12px">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" />
    </svg>
  </BaseMotionIcon>
</template>
```

:::

## API

### 属性

| 属性      | 类型                          | 默认值     | 说明                   |
| --------- | ----------------------------- | ---------- | ---------------------- |
| `as`      | `keyof HTMLElementTagNameMap` | `'span'`   | 根元素标签             |
| `variant` | `'random' \| 'brand'`         | `'random'` | 随机反馈或固定品牌动效 |

### 插槽

| 插槽      | 说明               |
| --------- | ------------------ |
| `default` | 需要动效的图标内容 |
