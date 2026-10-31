<script setup lang="ts">
import SwitchDemo from '../examples/SwitchDemo.vue'
</script>

# Switch 开关

即时切换启用或停用状态

## 基础用法

<DemoExample>

<ClientOnly>
  <SwitchDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <ZSwitch v-model="enabled" label="启用配置" active-text="开" inactive-text="关" inline-prompt />
</template>
```

</template>

</DemoExample>

## 用法说明

通过 `active-text`、`inactive-text` 描述状态，`inline-prompt` 将文字放入开关内部

## Switch API {#api}

### 属性

| 属性                          | 说明                              | 类型               | 默认值  |
| ----------------------------- | --------------------------------- | ------------------ | ------- |
| `v-model`                     | 开关状态                          | `boolean`          | `false` |
| `label`                       | 可见标签；隐藏标签使用 aria-label | `string`           | —       |
| `active-text / inactive-text` | 开启与关闭文字                    | `string`           | `''`    |
| `inline-prompt`               | 在开关内部显示状态文字            | `boolean`          | `false` |
| `width`                       | 轨道宽度，数字按 px 处理          | `string \| number` | `''`    |
| `disabled`                    | 禁止修改                          | `boolean`          | `false` |

### 事件

| 事件                | 说明                      |
| ------------------- | ------------------------- |
| `update:modelValue` | boolean，绑定值变化       |
| `change`            | boolean，用户切换开关状态 |
| `focus / blur`      | FocusEvent，焦点变化      |

### 实例

`focus()`、`blur()` 控制原生开关输入框焦点
