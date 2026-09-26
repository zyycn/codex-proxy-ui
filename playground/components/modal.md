<script setup lang="ts">
import ModalDemo from '../examples/ModalDemo.vue'
</script>

# Modal 弹窗

为需要独立处理的操作提供对话空间

## 交互示例

<ClientOnly>
  <ModalDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseButton, BaseModal } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <BaseButton @click="open = true">
    编辑配置
  </BaseButton>
  <BaseModal v-model="open" title="编辑配置" description="变更在保存后生效">
    <p>在这里放置表单或其他内容</p>
    <template #footer>
      <BaseButton @click="open = false">
        关闭
      </BaseButton>
    </template>
  </BaseModal>
</template>
```

:::

## 使用要点

`v-model` 控制开关，`size` 调整宽度，标题描述当前操作

## API

### 属性

| 属性          | 类型                                                        | 默认值      | 说明                             |
| ------------- | ----------------------------------------------------------- | ----------- | -------------------------------- |
| `v-model`     | `boolean`                                                   | `false`     | 控制打开状态                     |
| `title`       | `string`                                                    | 必填        | 弹窗标题                         |
| `description` | `string`                                                    | —           | 标题下方说明                     |
| `size`        | `'sm' \| 'md' \| 'md-wide' \| 'lg' \| 'xl'`                 | `'md'`      | 最大宽度                         |
| `tone`        | `'neutral' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `'neutral'` | 标题图标语义                     |
| `dismissible` | `boolean`                                                   | `true`      | 允许关闭按钮、遮罩与 Escape 关闭 |
| `draggable`   | `boolean`                                                   | `true`      | 允许拖拽标题栏                   |
| `role`        | `'dialog' \| 'alertdialog'`                                 | `'dialog'`  | 无障碍角色                       |

### 事件

| 事件                | 说明                |
| ------------------- | ------------------- |
| `update:modelValue` | boolean，绑定值变化 |

### 插槽

| 插槽                 | 说明               |
| -------------------- | ------------------ |
| `default`            | 可滚动的主体内容   |
| `footer`             | 底部操作           |
| `description / icon` | 替换标题说明或图标 |
