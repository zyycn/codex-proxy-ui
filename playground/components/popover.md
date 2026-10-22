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
import { ZButton, ZPopover } from '@codex-proxy/ui'
</script>

<template>
  <ZPopover placement="bottom" trigger="click">
    <template #reference>
      <ZButton>授权说明</ZButton>
    </template>
    <p style="margin: 0; padding: 8px 12px">
      插件只会使用已明确授予的权限
    </p>
  </ZPopover>
</template>
```

:::

## 使用要点

`placement` 设置位置，`trigger` 决定点击或悬停触发，`offset` 控制与锚点的距离

悬停触发时，`enterable` 默认允许鼠标移入浮层，`show-after / hide-after` 控制打开和关闭延迟。触发区放在 `reference` 插槽中，`reference-element` 只负责定位；宿主无需另写鼠标离开时的关闭逻辑

## API

### 属性

| 属性                         | 类型                                                                                                   | 默认值         | 说明                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | -------------- | ---------------------------------------------- |
| `v-model`                    | `boolean`                                                                                              | `false`        | 控制打开状态                                   |
| `placement`                  | `'top' \| 'top-start' \| 'top-end' \| 'right' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left'` | `'bottom-end'` | 首选位置，空间不足时自动调整                   |
| `trigger`                    | `'click' \| 'hover' \| 'hover-click'`                                                                  | `'click'`      | 触发方式                                       |
| `offset`                     | `number`                                                                                               | `6`            | 与锚点的距离，单位 px                          |
| `hoverDelay`                 | `number`                                                                                               | `400`          | 悬停打开延迟，单位 ms                          |
| `show-after`                 | `number`                                                                                               | 无             | 悬停打开延迟，单位 ms，优先于 `hoverDelay`     |
| `hide-after`                 | `number`                                                                                               | `200`          | 悬停关闭延迟，单位 ms                          |
| `enterable`                  | `boolean`                                                                                              | `true`         | 鼠标移入浮层时保持打开，适用于悬停触发         |
| `disabled / animatePosition` | `boolean`                                                                                              | `false`        | 禁用触发与位置过渡                             |
| `reference-element`          | `HTMLElement \| null`                                                                                  | `null`         | 外部锚点，默认使用触发区                       |
| `teleported`                 | `boolean`                                                                                              | `true`         | 将浮层传送到 body                              |
| `role`                       | `'tooltip' \| 'dialog'`                                                                                | —              | 浮层的无障碍角色                               |
| `arrowSurfaceClass`          | `string \| Partial<Record<PopoverSide, string>>`                                                       | —              | 箭头表面类，可按 top、right、bottom、left 指定 |

### 事件与实例

- `update:modelValue(value: boolean)`：打开状态变化
- `open / close`：打开、关闭开始
- `opened / closed`：入场、退场完成
- 实例：`open()`、`close()`、`focus()`、`updatePosition()`

默认正文使用主题字号，触发容器按内容宽度定位。整页和嵌套容器滚动时，面板与 Select 下拉一样跟随锚点；支持原生锚点定位的浏览器直接处理跟随，其余浏览器通过滚动事件更新坐标

`placement`、`offset` 和 `reference-element` 变化时重新计算位置，空间不足时自动翻转并限制在视口内

### 插槽

| 插槽        | 说明                                                                  |
| ----------- | --------------------------------------------------------------------- |
| `reference` | 触发内容，接收 `{ open, close, toggle, id }`，id 可用于 aria-controls |
| `default`   | 浮层内容，接收 `{ open, close, toggle }`                              |

插槽中的 `open` 是当前显隐布尔值，`close` 与 `toggle` 是操作函数
