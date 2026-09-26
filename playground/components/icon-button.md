<script setup lang="ts">
import IconButtonDemo from '../examples/IconButtonDemo.vue'
</script>

# IconButton 图标按钮

在紧凑空间中呈现单一操作

## 交互示例

<ClientOnly>
  <IconButtonDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseIconButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <BaseIconButton label="刷新配置" @click="count++">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9" />
    </svg>
  </BaseIconButton>
  <output aria-label="刷新次数">{{ count }}</output>
</template>
```

:::

## 使用要点

使用 `label` 提供可访问名称，图标默认随 `size` 缩放

## API

### 属性

| 属性                           | 类型                                                                            | 默认值     | 说明                 |
| ------------------------------ | ------------------------------------------------------------------------------- | ---------- | -------------------- |
| `label`                        | `string`                                                                        | 必填       | 可访问名称与悬停提示 |
| `variant`                      | `'primary' \| 'secondary' \| 'filled' \| 'success' \| 'ghost' \| 'destructive'` | `'ghost'`  | 按钮样式             |
| `size`                         | `'sm' \| 'md' \| 'lg'`                                                          | `'md'`     | 按钮和默认图标尺寸   |
| `loading / disabled / pressed` | `boolean`                                                                       | `false`    | 加载、禁用与按下状态 |
| `type`                         | `'button' \| 'submit' \| 'reset'`                                               | `'button'` | 原生按钮类型         |

### 事件

| 事件    | 说明                                  |
| ------- | ------------------------------------- |
| `click` | 原生 MouseEvent，加载与禁用时不会触发 |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 图标内容 |
| `loading` | 加载图标 |
