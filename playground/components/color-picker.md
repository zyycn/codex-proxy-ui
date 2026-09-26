<script setup lang="ts">
import ColorPickerDemo from '../examples/ColorPickerDemo.vue'
</script>

# ColorPicker 颜色选择

通过色板、预设色或颜色输入选择颜色，确认后更新绑定值

## 交互示例

<ClientOnly>
  <ColorPickerDemo />
</ClientOnly>

## 使用要点

`v-model` 绑定颜色字符串，`presets` 配置快捷色板，`label` 提供可访问名称

`allowAlpha` 默认为 `true`，不需要透明度时设为 `false`，`disabled` 禁用交互

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseColorPicker } from '@codex-proxy/ui'
import { ref } from 'vue'

const color = ref('#5983F4')
const presets = ['#5983F4', '#0E7C72', '#A0583D']
</script>

<template>
  <BaseColorPicker v-model="color" label="主题色" :presets="presets" :allow-alpha="false" />
</template>
```

:::

## API

### 属性

| 属性         | 类型                | 默认值       | 说明                                    |
| ------------ | ------------------- | ------------ | --------------------------------------- |
| `v-model`    | `string`            | 必填         | HEX 颜色值，允许透明度时可含 Alpha 通道 |
| `label`      | `string`            | `'选择颜色'` | 触发按钮名称                            |
| `presets`    | `readonly string[]` | `[]`         | 预设颜色                                |
| `allowAlpha` | `boolean`           | `true`       | 启用透明度编辑                          |
| `disabled`   | `boolean`           | `false`      | 禁用选择器                              |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | string，绑定值变化 |
