<script setup lang="ts">
import ConfirmModalDemo from '../examples/ConfirmModalDemo.vue'
</script>

# ConfirmModal 确认弹窗

提供一致的确认与取消入口，用于需要用户确认的操作

## 交互示例

<ClientOnly>
  <ConfirmModalDemo />
</ClientOnly>

## 使用要点

`v-model` 控制显隐，`title` 与 `description` 说明操作，`destructive` 强调危险行为

监听 `confirm` 执行操作，成功后由调用方关闭弹窗；异步操作期间设置 `loading`，以避免重复提交

`confirmText`、`cancelText` 定义按钮文案，`confirmDisabled` 禁用确认

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BaseConfirmModal } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
const removed = ref(false)

function confirm() {
  removed.value = true
  open.value = false
}
</script>

<template>
  <BaseButton variant="destructive" @click="open = true">
    移除示例项
  </BaseButton>
  <BaseConfirmModal
    v-model="open"
    title="移除示例项"
    description="此操作仅更新本地演示状态"
    destructive
    confirm-text="移除"
    @confirm="confirm"
  />
  <output aria-label="操作结果">{{ removed ? '已移除' : '尚未移除' }}</output>
</template>
```

:::

## API

### 属性

| 属性                       | 类型      | 默认值            | 说明               |
| -------------------------- | --------- | ----------------- | ------------------ |
| `v-model`                  | `boolean` | `false`           | 控制打开状态       |
| `title`                    | `string`  | 必填              | 确认标题           |
| `description`              | `string`  | —                 | 确认说明           |
| `destructive`              | `boolean` | `false`           | 使用危险操作样式   |
| `confirmText / cancelText` | `string`  | `'确认' / '取消'` | 操作按钮文案       |
| `loading`                  | `boolean` | `false`           | 阻止重复确认和关闭 |
| `confirmDisabled`          | `boolean` | `false`           | 禁用确认按钮       |

### 事件

| 事件                | 说明                                                      |
| ------------------- | --------------------------------------------------------- |
| `update:modelValue` | boolean，打开状态变化                                     |
| `confirm`           | 点击确认时触发，由调用方完成操作并关闭                    |
| `cancel`            | 点击取消按钮时触发，遮罩、Escape 和关闭图标只更新打开状态 |

### 插槽

| 插槽      | 说明         |
| --------- | ------------ |
| `default` | 补充确认内容 |
