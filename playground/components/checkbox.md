<script setup lang="ts">
import CheckboxDemo from '../examples/CheckboxDemo.vue'
</script>

# Checkbox 复选框

独立选择一个选项，也可呈现半选状态

## 基础用法

<DemoExample>

<ClientOnly>
  <CheckboxDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZCheckbox } from '@codex-proxy/ui'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <ZCheckbox v-model="checked" label="允许修改响应头" />
</template>
```

</template>

</DemoExample>

## 用法说明

`v-model` 绑定布尔值，`indeterminate` 仅表示半选外观

## Checkbox API {#api}

### 属性

| 属性            | 说明                              | 类型      | 默认值  |
| --------------- | --------------------------------- | --------- | ------- |
| `v-model`       | 选中状态                          | `boolean` | `false` |
| `label`         | 可见标签；隐藏标签使用 aria-label | `string`  | —       |
| `indeterminate` | 半选外观，不改写绑定值            | `boolean` | `false` |
| `disabled`      | 禁止修改                          | `boolean` | `false` |

### 事件

| 事件                | 说明                      |
| ------------------- | ------------------------- |
| `update:modelValue` | boolean，绑定值变化       |
| `change`            | boolean，用户切换选中状态 |
| `focus / blur`      | FocusEvent，焦点变化      |

### 插槽

- `label`：自定义可见标签

### 实例

`focus()`、`blur()`
