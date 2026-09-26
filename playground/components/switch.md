<script setup lang="ts">
import SwitchDemo from '../examples/SwitchDemo.vue'
</script>

# Switch 开关

即时切换启用或停用状态

## 交互示例

<ClientOnly>
  <SwitchDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <BaseSwitch v-model="enabled" label="启用配置" active-text="开" inactive-text="关" inline-prompt />
</template>
```

:::

## 使用要点

通过 `activeText`、`inactiveText` 描述状态，`inlinePrompt` 将文字放入开关内部

## API

### 属性

| 属性                        | 类型               | 默认值  | 说明                     |
| --------------------------- | ------------------ | ------- | ------------------------ |
| `v-model`                   | `boolean`          | `false` | 开关状态                 |
| `label`                     | `string`           | 必填    | 可访问名称               |
| `showLabel`                 | `boolean`          | `false` | 显示名称文字             |
| `activeText / inactiveText` | `string`           | `''`    | 开启与关闭文字           |
| `inlinePrompt`              | `boolean`          | `false` | 在开关内部显示状态文字   |
| `width`                     | `string \| number` | `''`    | 轨道宽度，数字按 px 处理 |
| `disabled`                  | `boolean`          | `false` | 禁止修改                 |

### 事件

| 事件                | 说明                |
| ------------------- | ------------------- |
| `update:modelValue` | boolean，绑定值变化 |
