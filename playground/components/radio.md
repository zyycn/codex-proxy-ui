<script setup lang="ts">
import RadioDemo from '../examples/RadioDemo.vue'
</script>

# Radio 单选框

从同一组选项中选择一项

## 交互示例

<ClientOnly>
  <RadioDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseRadio } from '@codex-proxy/ui'
import { ref } from 'vue'

const scope = ref('selected')
</script>

<template>
  <BaseRadio v-model="scope" name="scope" value="selected" label="指定请求" show-label />
  <BaseRadio v-model="scope" name="scope" value="all" label="全部请求" show-label />
</template>
```

:::

## 使用要点

同组使用相同的 `name` 与 `v-model`，每个选项设置不同的 `value`

## API

### 属性

| 属性                   | 类型      | 默认值  | 说明                           |
| ---------------------- | --------- | ------- | ------------------------------ |
| `v-model`              | `string`  | 必填    | 当前选中值                     |
| `value / name / label` | `string`  | 必填    | 选项值、原生分组名与可访问名称 |
| `showLabel`            | `boolean` | `false` | 显示名称文字                   |
| `disabled`             | `boolean` | `false` | 禁用此选项                     |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | string，绑定值变化 |

### 插槽

| 插槽      | 说明                             |
| --------- | -------------------------------- |
| `default` | 自定义可见标签，优先于 showLabel |
