<script setup lang="ts">
import NotificationDemo from '../examples/NotificationDemo.vue'
</script>

# Notification 消息提示

显示操作结果或状态通知。

## 基础用法

调用 `ZNotification.success()` 显示成功提示。

<DemoExample>

<ClientOnly>
  <NotificationDemo />
</ClientOnly>

<template #source>

<<< @/examples/NotificationDemo.vue

</template>

</DemoExample>

## Notification API {#api}

### 服务

传入选项、字符串或 VNode，返回的 `close()` 关闭当前通知。快捷方法支持 `primary`、`success`、`warning`、`error` 和 `info`。第二个参数可传入 Vue 应用上下文，供正文组件使用

通知从所在一侧滑入，关闭时原地淡出。同一个角落按内容高度自动排列，内容换行或尺寸变化时重新计算位置。`ZNotification.closeAll()` 关闭当前服务的全部通知，`updateOffsets(position?)` 手动更新指定角落的位置

| 选项                       | 类型                               | 默认值            | 说明                                                   |
| -------------------------- | ---------------------------------- | ----------------- | ------------------------------------------------------ |
| `message`                  | `string \| VNode \| (() => VNode)` | —                 | 正文，默认按文本显示                                   |
| `title`                    | `string`                           | 类型默认标题      | 传空字符串可隐藏标题                                   |
| `type`                     | `NotificationType`                 | `'info'`          | 设置图标与语义颜色                                     |
| `position`                 | `NotificationPosition`             | `'top-right'`     | 支持四个角落                                           |
| `offset`                   | `number`                           | `0`               | 垂直方向额外偏移量（px），基础间距为 16px              |
| `duration`                 | `number`                           | `4500`            | 毫秒，0 表示手动关闭                                   |
| `pauseOnHover`             | `boolean`                          | `true`            | 悬停暂停倒计时，移开后继续剩余时间                     |
| `progress`                 | `boolean \| NotificationProgress`  | `false`           | 显示倒计时条，可设置颜色、线宽、文字与条纹             |
| `showClose`                | `boolean`                          | `true`            | 显示关闭按钮                                           |
| `icon / closeIcon`         | `string \| Component`              | 按类型 / 关闭图标 | 自定义通知图标或关闭图标                               |
| `appendTo`                 | `HTMLElement \| string`            | `document.body`   | 挂载元素或选择器                                       |
| `customClass / zIndex`     | Vue class / `number`               | — / `9999`        | 自定义类名或层级                                       |
| `onClick / onClose`        | 回调                               | —                 | 分别在点击通知和开始关闭时触发，关闭回调接收通知 VNode |
| `dangerouslyUseHTMLString` | `boolean`                          | `false`           | 将字符串正文作为 HTML 渲染，仅用于可信内容             |
| `deduplicate`              | `boolean`                          | `false`           | 在同一容器和角落复用类型、标题和正文相同的通知         |

Esc 关闭通知。Delete 和 Backspace 暂停倒计时，其他按键恢复倒计时。启用减少动态效果时直接显示和关闭
