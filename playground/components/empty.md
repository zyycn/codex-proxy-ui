<script setup lang="ts">
import EmptyDemo from '../examples/EmptyDemo.vue'
</script>

# Empty 空状态

在没有内容时说明状态并给出下一步操作

## 基础用法

<DemoExample>

<ClientOnly>
  <EmptyDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZEmpty } from '@codex-proxy/ui'
</script>

<template>
  <ZEmpty title="暂无插件" description="安装插件后即可开始配置" />
</template>
```

</template>

</DemoExample>

## 用法说明

通过 `description` 补充原因，`action` 插槽提供相关操作

## Empty API {#api}

### 属性

| 属性          | 说明       | 类型                            | 默认值       |
| ------------- | ---------- | ------------------------------- | ------------ |
| `title`       | 空状态标题 | `string`                        | `'暂无数据'` |
| `description` | 补充说明   | `string`                        | —            |
| `icon`        | 图标组件   | `Component`                     | `Inbox`      |
| `size`        | 尺寸       | `'small' \| 'default'`          | `'default'`  |
| `surface`     | 背景表面   | `'subtle' \| 'inset' \| 'none'` | `'subtle'`   |

### 插槽

| 插槽     | 说明       |
| -------- | ---------- |
| `icon`   | 替换图标   |
| `action` | 空状态操作 |
