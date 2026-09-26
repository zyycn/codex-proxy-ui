<script setup lang="ts">
import SkeletonDemo from '../examples/SkeletonDemo.vue'
</script>

# Skeleton 骨架屏

在内容到达前保留页面的主要形状

## 交互示例

<ClientOnly>
  <SkeletonDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseSkeleton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: grid; gap: 12px">
    <BaseSkeleton shape="circle" style="width: 48px; height: 48px" />
    <BaseSkeleton shape="text" style="width: 160px" />
    <BaseSkeleton shape="text" style="width: 240px; max-width: 100%" />
  </div>
</template>
```

:::

## 使用要点

使用 `shape` 与尺寸组合占位，`animated` 控制动画

## API

### 属性

| 属性       | 类型                            | 默认值    | 说明                               |
| ---------- | ------------------------------- | --------- | ---------------------------------- |
| `as`       | `keyof HTMLElementTagNameMap`   | `'span'`  | 根元素标签                         |
| `shape`    | `'text' \| 'block' \| 'circle'` | `'block'` | 占位形状，宽高由调用方设置         |
| `animated` | `boolean`                       | `true`    | 播放加载动画，尊重减少动态效果设置 |
