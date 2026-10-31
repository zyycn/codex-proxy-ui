<script setup lang="ts">
import RadioDemo from '../examples/RadioDemo.vue'
</script>

# Radio 单选框

从同一组选项中选择一项

## 基础用法

<DemoExample>

<ClientOnly>
  <RadioDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZRadio } from '@codex-proxy/ui'
import { ref } from 'vue'

const scope = ref('selected')
</script>

<template>
  <ZRadio v-model="scope" name="scope" value="selected" label="指定请求" />
  <ZRadio v-model="scope" name="scope" value="all" label="全部请求" />
</template>
```

</template>

</DemoExample>

## 用法说明

同组使用相同的 `name` 与 `v-model`，每个选项设置不同的 `value`

## Radio API {#api}

### 属性

| 属性           | 说明                                      | 类型               | 默认值  |
| -------------- | ----------------------------------------- | ------------------ | ------- |
| `v-model`      | 当前选中值                                | `string \| number` | 必填    |
| `value`        | 选项值，与模型使用相同的值类型            | `string \| number` | 必填    |
| `name / label` | 分组名和可见标签；隐藏名称使用 aria-label | `string`           | —       |
| `disabled`     | 禁用此选项                                | `boolean`          | `false` |

### 事件

| 事件                | 说明                           |
| ------------------- | ------------------------------ |
| `update:modelValue` | string 或 number，绑定值变化   |
| `change`            | string 或 number，用户选中此项 |
| `focus / blur`      | FocusEvent，焦点变化           |

### 插槽

| 插槽      | 说明                         |
| --------- | ---------------------------- |
| `default` | 自定义可见标签，优先于 label |

### 实例

`focus()`、`blur()` 控制原生单选框焦点
