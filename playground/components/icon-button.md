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
import { ZIconButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZIconButton aria-label="刷新配置" @click="count++">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M20 7v5h-5M4 17v-5h5M6.1 6.1A8 8 0 0 1 20 12M4 12a8 8 0 0 0 13.9 5.9" />
    </svg>
  </ZIconButton>
  <output aria-label="刷新次数">{{ count }}</output>
</template>
```

:::

## 使用要点

使用 `aria-label` 提供可访问名称，图标默认随 `size` 缩放

## API

### 属性

| 属性                 | 类型                                                                     | 默认值      | 说明                     |
| -------------------- | ------------------------------------------------------------------------ | ----------- | ------------------------ |
| `aria-label`         | `string`                                                                 | —           | 提供可访问名称与悬停提示 |
| `type`               | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | 语义类型                 |
| `variant`            | `'solid' \| 'plain' \| 'text' \| 'link'`                                 | `'text'`    | 外观                     |
| `size`               | `'small' \| 'default' \| 'large'`                                        | `'default'` | 组件尺寸                 |
| `native-type`        | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  | 原生按钮行为             |
| `loading / disabled` | `boolean`                                                                | `false`     | 加载与禁用均阻止点击     |
| `pressed`            | `boolean`                                                                | `false`     | 切换动作的按下状态       |

### 事件、插槽与实例

- `click(event: MouseEvent)`：用户点击
- 插槽：`default`、`loading`
- 实例：`focus()`、`blur()`、`element`
