<script setup lang="ts">
import NotificationDemo from '../examples/NotificationDemo.vue'
</script>

# Notification 消息提示

为已经完成或失败的操作提供短反馈

## 交互示例

<ClientOnly>
  <NotificationDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZButton, ZNotification } from '@codex-proxy/ui'
</script>

<template>
  <ZButton @click="ZNotification.success({ message: '保存成功' })">
    显示提示
  </ZButton>
</template>
```

:::

## 使用要点

通过 `ZNotification(options)` 或 `ZNotification.success / error / warning / info(options)` 显示通知。服务自动挂载通知列表，全部通知退场后卸载容器

## API

### 服务

创建通知返回 `{ close() }`，可手动关闭该条通知。`ZNotification.closeAll()` 关闭所有通知

| NotificationOptions | 类型               | 默认值       | 说明                               |
| ------------------- | ------------------ | ------------ | ---------------------------------- |
| `message`           | `string`           | 必填         | 通知正文                           |
| `type`              | `NotificationType` | `'info'`     | 通知类型，快捷方法固定对应类型     |
| `title`             | `string`           | 类型默认标题 | 通知标题                           |
| `duration`          | `number`           | `3000`       | 毫秒，0 表示不自动关闭             |
| `deduplicate`       | `boolean`          | `false`      | 同类型、标题、正文仍存在时复用通知 |

手动关闭、自动关闭和 `closeAll()` 都会清理对应计时器，通知列表与容器生命周期由服务内部管理
