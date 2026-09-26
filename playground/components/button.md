<script setup lang="ts">
import ButtonDemo from '../examples/ButtonDemo.vue'
</script>

# Button 按钮

触发操作，区分主要、次要与危险动作

## 交互示例

<ClientOnly>
  <ButtonDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <BaseButton variant="primary" @click="count++">
    已保存 {{ count }} 次
  </BaseButton>
</template>
```

:::

## 使用要点

`variant` 决定强调程度，`loading` 会同时禁用重复点击

## API

### 属性

| 属性                 | 类型                                                             | 默认值        | 说明                 |
| -------------------- | ---------------------------------------------------------------- | ------------- | -------------------- |
| `variant`            | `'primary' \| 'secondary' \| 'soft' \| 'ghost' \| 'destructive'` | `'secondary'` | 按钮样式             |
| `size`               | `'sm' \| 'md' \| 'lg'`                                           | `'md'`        | 尺寸                 |
| `loading / disabled` | `boolean`                                                        | `false`       | 加载或禁用时阻止点击 |
| `type`               | `'button' \| 'submit' \| 'reset'`                                | `'button'`    | 原生按钮类型         |

### 事件

| 事件    | 说明                                  |
| ------- | ------------------------------------- |
| `click` | 原生 MouseEvent，加载与禁用时不会触发 |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 按钮文字 |
| `icon`    | 前置图标 |
| `loading` | 加载图标 |
