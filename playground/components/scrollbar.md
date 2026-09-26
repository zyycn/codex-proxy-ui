<script setup lang="ts">
import ScrollbarDemo from '../examples/ScrollbarDemo.vue'
</script>

# Scrollbar 滚动容器

使用原生滚动行为，统一滚动条外观与内容区域尺寸

## 交互示例

<ClientOnly>
  <ScrollbarDemo />
</ClientOnly>

## 使用要点

`height` 或 `maxHeight` 约束容器高度，`horizontal` 开启横向滚动，`vertical` 默认开启

`alwaysVisible` 控制滚动条常显，`scroll` 事件返回 `scrollTop` 与 `scrollLeft`

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseScrollbar } from '@codex-proxy/ui'
import { ref } from 'vue'

const scrollTop = ref(0)
</script>

<template>
  <BaseScrollbar height="224px" horizontal @scroll="scrollTop = $event.scrollTop">
    <div style="min-width: 600px">
      <p v-for="index in 20" :key="index">
        示例内容 {{ index }}
      </p>
    </div>
  </BaseScrollbar>
  <output aria-label="滚动位置">已滚动 {{ Math.round(scrollTop) }} px</output>
</template>
```

:::

## API

### 属性

| 属性                 | 类型      | 默认值  | 说明                              |
| -------------------- | --------- | ------- | --------------------------------- |
| `height / maxHeight` | `string`  | —       | 容器高度与最大高度，需带 CSS 单位 |
| `horizontal`         | `boolean` | `false` | 允许横向滚动                      |
| `vertical`           | `boolean` | `true`  | 允许纵向滚动                      |
| `alwaysVisible`      | `boolean` | `false` | 溢出时始终显示滚动条              |

### 事件

| 事件     | 说明                                        |
| -------- | ------------------------------------------- |
| `scroll` | `{ scrollTop: number, scrollLeft: number }` |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 滚动内容 |

### 方法

| 方法                               | 说明                                       |
| ---------------------------------- | ------------------------------------------ |
| `update()`                         | 内容尺寸变化后重算滚动条                   |
| `scrollToTop() / scrollToBottom()` | 滚动到顶部或底部，返回 `Promise<void>`     |
| `wrapRef`                          | 内部滚动元素，可读取 scrollTop、scrollLeft |
