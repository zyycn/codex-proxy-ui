<script setup lang="ts">
import EmptyDemo from '../examples/EmptyDemo.vue'
</script>

# Empty 空状态

在没有内容时说明状态并给出下一步操作

## 交互示例

<ClientOnly>
  <EmptyDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseEmpty } from '@codex-proxy/ui'
</script>

<template>
  <BaseEmpty title="暂无插件" description="安装插件后即可开始配置" />
</template>
```

:::

## 使用要点

通过 `description` 补充原因，`action` 插槽提供相关操作

## API

### 属性

| 属性          | 类型                            | 默认值       | 说明       |
| ------------- | ------------------------------- | ------------ | ---------- |
| `title`       | `string`                        | `'暂无数据'` | 空状态标题 |
| `description` | `string`                        | —            | 补充说明   |
| `icon`        | `Component`                     | `Inbox`      | 图标组件   |
| `size`        | `'sm' \| 'md'`                  | `'md'`       | 尺寸       |
| `surface`     | `'subtle' \| 'inset' \| 'none'` | `'subtle'`   | 背景表面   |

### 插槽

| 插槽     | 说明       |
| -------- | ---------- |
| `icon`   | 替换图标   |
| `action` | 空状态操作 |
