<script setup lang="ts">
import MenuItemDemo from '../examples/MenuItemDemo.vue'
</script>

# MenuItem 菜单项

用于操作列表，可组合图标、禁用、加载与危险操作

## 交互示例

<ClientOnly>
  <MenuItemDemo />
</ClientOnly>

## 使用要点

默认插槽提供操作文字，`icon` 插槽放置图标，`tone="destructive"` 标识危险操作

`disabled` 与 `loading` 阻止点击，组件是按钮，不负责菜单容器的定位与开关

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseMenuItem } from '@codex-proxy/ui'
import { ref } from 'vue'

const action = ref('尚未操作')
</script>

<template>
  <BaseMenuItem @click="action = '编辑'">
    编辑
  </BaseMenuItem>
  <BaseMenuItem tone="destructive" @click="action = '移除'">
    移除
  </BaseMenuItem>
  <output aria-label="当前操作">{{ action }}</output>
</template>
```

:::

## API

### 属性

| 属性                 | 类型                         | 默认值      | 说明                 |
| -------------------- | ---------------------------- | ----------- | -------------------- |
| `tone`               | `'neutral' \| 'destructive'` | `'neutral'` | 普通或危险操作       |
| `disabled / loading` | `boolean`                    | `false`     | 禁用或加载时阻止点击 |

### 事件

| 事件    | 说明                                  |
| ------- | ------------------------------------- |
| `click` | 原生 MouseEvent，加载与禁用时不会触发 |

### 插槽

| 插槽             | 说明               |
| ---------------- | ------------------ |
| `default`        | 菜单文字           |
| `icon / loading` | 普通图标或加载图标 |
