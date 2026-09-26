<script setup lang="ts">
import ToastDemo from '../examples/ToastDemo.vue'
</script>

# Toast 消息提示

为已经完成或失败的操作提供短反馈

## 交互示例

<ClientOnly>
  <ToastDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BaseToast, toast } from '@codex-proxy/ui'
</script>

<template>
  <BaseButton @click="toast.success('保存成功')">
    显示提示
  </BaseButton>
  <BaseToast />
</template>
```

:::

## 使用要点

页面挂载一个 `BaseToast`，通过 `toast.success`、`toast.error` 等方法触发提示

## API

`BaseToast` 无需属性，在应用根部挂载一次，已有全局容器时不要重复挂载示例中的容器

### 方法

| 方法                                     | 参数                                                                                                   | 返回值  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------- |
| `toast.success / error / warning / info` | `message: string, options?: number \| ToastOptions`                                                    | 消息 ID |
| `toast.show`                             | `type: 'success' \| 'error' \| 'warning' \| 'info', message: string, options?: number \| ToastOptions` | 消息 ID |
| `toast.remove`                           | `id: string`                                                                                           | 无      |

### ToastOptions

| 属性       | 类型     | 默认值     | 说明                                       |
| ---------- | -------- | ---------- | ------------------------------------------ |
| `title`    | `string` | 按类型生成 | 自定义标题                                 |
| `duration` | `number` | `3000`     | 持续时间，单位 ms，小于等于 0 时需手动关闭 |

`options` 直接传数字时表示持续时间，触发方法应在客户端交互中调用
