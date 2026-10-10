<script setup lang="ts">
import ButtonDemo from '../examples/ButtonDemo.vue'
</script>

# Button 按钮

触发操作，区分主要、次要与危险动作

## 交互示例

<ClientOnly>
  <ButtonDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <ZButton type="primary" @click="count++">
    已保存 {{ count }} 次
  </ZButton>
</template>
```

:::

## 使用要点

`type` 决定语义，`variant` 决定强调程度，`loading` 会同时禁用重复点击

## API

### 属性

| 属性                 | 类型                                                                     | 默认值      | 说明                 |
| -------------------- | ------------------------------------------------------------------------ | ----------- | -------------------- |
| `type`               | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | 语义类型             |
| `variant`            | `'solid' \| 'plain' \| 'text' \| 'link'`                                 | `'solid'`   | 外观                 |
| `size`               | `'small' \| 'default' \| 'large'`                                        | `'default'` | 组件尺寸             |
| `native-type`        | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  | 原生按钮行为         |
| `loading / disabled` | `boolean`                                                                | `false`     | 加载与禁用均阻止点击 |

### 事件、插槽与实例

- `click(event: MouseEvent)`：用户点击，禁用或加载时不触发
- 插槽：`default`、`icon`、`loading`
- 实例：`focus()`、`blur()`、`element`（原生按钮）
