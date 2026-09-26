<script setup lang="ts">
import PopoverDemo from '../examples/PopoverDemo.vue'
</script>

# Popover 气泡

在锚点附近展示补充说明或轻量操作

## 交互示例

<ClientOnly>
  <PopoverDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BasePopover } from '@codex-proxy/ui'
</script>

<template>
  <BasePopover placement="bottom" trigger="click">
    <template #trigger>
      <BaseButton>授权说明</BaseButton>
    </template>
    <p style="margin: 0; padding: 16px">
      插件只会使用已明确授予的权限
    </p>
  </BasePopover>
</template>
```

:::

## 使用要点

`placement` 设置位置，`trigger` 决定点击或悬停触发，`offset` 控制与锚点的距离

## API

### 属性

| 属性                         | 类型                                                                                                   | 默认值         | 说明                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------- |
| `v-model`                    | `boolean`                                                                                              | `false`        | 控制打开状态                                   |
| `placement`                  | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left'` | `'bottom-end'` | 首选位置，空间不足时自动调整                   |
| `trigger`                    | `'click' \| 'hover' \| 'hover-click'`                                                                  | `'click'`      | 触发方式                                       |
| `offset`                     | `number`                                                                                               | `6`            | 与锚点的距离，单位 px                          |
| `hoverDelay`                 | `number`                                                                                               | `400`          | 悬停打开延迟，单位 ms                          |
| `disabled / animatePosition` | `boolean`                                                                                              | `false`        | 禁用触发与位置过渡                             |
| `anchorElement`              | `HTMLElement \| null`                                                                                  | `null`         | 外部锚点，默认使用触发区                       |
| `arrowSurfaceClass`          | `string \| Partial<Record<PopoverSide, string>>`                                                       | —              | 箭头表面类，可按 top、right、bottom、left 指定 |

### 事件

| 事件                | 说明                |
| ------------------- | ------------------- |
| `update:modelValue` | boolean，绑定值变化 |

### 插槽

| 插槽      | 说明                                     |
| --------- | ---------------------------------------- |
| `trigger` | 触发内容，接收 `{ open, close, toggle }` |
| `default` | 浮层内容，接收 `{ open, close, toggle }` |
