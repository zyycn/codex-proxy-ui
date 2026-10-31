<script setup lang="ts">
import SkeletonDemo from '../examples/SkeletonDemo.vue'
</script>

# Skeleton 骨架屏

在内容到达前保留页面的主要形状

## 基础用法

<DemoExample>

<ClientOnly>
  <SkeletonDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZSkeleton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: grid; gap: 12px">
    <ZSkeleton shape="circle" style="width: 48px; height: 48px" />
    <ZSkeleton shape="text" style="width: 160px" />
    <ZSkeleton shape="text" style="width: 240px; max-width: 100%" />
  </div>
</template>
```

</template>

</DemoExample>

## 用法说明

使用 `shape` 与尺寸组合占位，`animated` 控制动画

## Skeleton API {#api}

### 属性

| 属性       | 说明                               | 类型                            | 默认值    |
| ---------- | ---------------------------------- | ------------------------------- | --------- |
| `as`       | 根元素标签                         | `keyof HTMLElementTagNameMap`   | `'span'`  |
| `shape`    | 占位形状，宽高由调用方设置         | `'text' \| 'block' \| 'circle'` | `'block'` |
| `animated` | 播放加载动画，尊重减少动态效果设置 | `boolean`                       | `true`    |
