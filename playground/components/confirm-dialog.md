<script setup lang="ts">
import ConfirmDialogDemo from '../examples/ConfirmDialogDemo.vue'
</script>

# ConfirmDialog 确认弹窗

提供一致的确认与取消入口，用于需要用户确认的操作

## 基础用法

<DemoExample>

<ClientOnly>
  <ConfirmDialogDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZButton, ZConfirmDialog } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
const removed = ref(false)

function confirm() {
  removed.value = true
  open.value = false
}
</script>

<template>
  <ZButton type="danger" variant="plain" @click="open = true">
    移除示例项
  </ZButton>
  <ZConfirmDialog
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

</template>

</DemoExample>

## 用法说明

`v-model` 控制显隐，`title` 与 `description` 说明操作，`destructive` 强调危险行为

监听 `confirm` 执行操作，成功后由调用方关闭弹窗；异步操作期间设置 `loading`，以避免重复提交

确认对象与提示内容在退出期间保持不变，内部内容在动画结束后自动卸载。调用方可在下次打开时替换确认对象，仅在需要额外收尾时监听 `closed`

`confirm-text`、`cancel-text` 定义按钮文案，`confirm-disabled` 禁用确认

## ConfirmDialog API {#api}

### 属性

| 属性                         | 说明               | 类型      | 默认值            |
| ---------------------------- | ------------------ | --------- | ----------------- |
| `v-model`                    | 控制打开状态       | `boolean` | `false`           |
| `title`                      | 确认标题           | `string`  | 必填              |
| `description`                | 确认说明           | `string`  | —                 |
| `destructive`                | 使用危险操作样式   | `boolean` | `false`           |
| `confirm-text / cancel-text` | 操作按钮文案       | `string`  | `'确认' / '取消'` |
| `loading`                    | 阻止重复确认和关闭 | `boolean` | `false`           |
| `confirm-disabled`           | 禁用确认按钮       | `boolean` | `false`           |

### 事件

| 事件                | 说明                                                      |
| ------------------- | --------------------------------------------------------- |
| `update:modelValue` | boolean，打开状态变化                                     |
| `confirm`           | 点击确认时触发，由调用方完成操作并关闭                    |
| `cancel`            | 点击取消按钮时触发，遮罩、Escape 和关闭图标只更新打开状态 |
| `open / close`      | 打开 / 关闭开始                                           |
| `opened`            | 入场动画完成                                              |
| `closed`            | 退出动画完成后触发，可执行必要的业务收尾                  |

### 插槽

| 插槽      | 说明         |
| --------- | ------------ |
| `default` | 补充确认内容 |
