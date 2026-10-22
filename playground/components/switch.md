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
import { ZSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const enabled = ref(true)
</script>

<template>
  <ZSwitch v-model="enabled" label="启用配置" active-text="开" inactive-text="关" inline-prompt />
</template>
```

:::

## 使用要点

通过 `active-text`、`inactive-text` 描述状态，`inline-prompt` 将文字放入开关内部

## API

### 属性

| 属性                          | 类型               | 默认值  | 说明                              |
| ----------------------------- | ------------------ | ------- | --------------------------------- |
| `v-model`                     | `boolean`          | `false` | 开关状态                          |
| `label`                       | `string`           | —       | 可见标签；隐藏标签使用 aria-label |
| `active-text / inactive-text` | `string`           | `''`    | 开启与关闭文字                    |
| `inline-prompt`               | `boolean`          | `false` | 在开关内部显示状态文字            |
| `width`                       | `string \| number` | `''`    | 轨道宽度，数字按 px 处理          |
| `disabled`                    | `boolean`          | `false` | 禁止修改                          |

### 事件

| 事件                | 说明                      |
| ------------------- | ------------------------- |
| `update:modelValue` | boolean，绑定值变化       |
| `change`            | boolean，用户切换开关状态 |
| `focus / blur`      | FocusEvent，焦点变化      |

### 实例

`focus()`、`blur()` 控制原生开关输入框焦点
