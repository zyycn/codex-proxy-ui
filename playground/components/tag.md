<script setup lang="ts">
import TagDemo from '../examples/TagDemo.vue'
</script>

# Tag 标签

用短标签呈现状态与分类

## 基础用法

<DemoExample>

<ClientOnly>
  <TagDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZButton, ZTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <ZTag v-if="visible" type="success" closable @close="visible = false">
    已启用
  </ZTag>
  <ZButton v-else @click="visible = true">
    恢复标签
  </ZButton>
</template>
```

</template>

</DemoExample>

## 用法说明

标签默认按内容宽度展示，放入网格时也不自动拉满；开启关闭按钮不改变对应尺寸的高度

`closable` 发出关闭事件，由调用方决定是否移除标签

## Tag API {#api}

### 属性

| 属性                          | 说明                                     | 类型                                                                     | 默认值      |
| ----------------------------- | ---------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| `type`                        | 状态样式                                 | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `size`                        | 尺寸                                     | `'small' \| 'default' \| 'large'`                                        | `'default'` |
| `round / closable / disabled` | 圆角、关闭按钮与禁用状态                 | `boolean`                                                                | `false`     |
| `closeLabel`                  | 关闭按钮名称，默认由“移除”和标签内容组合 | `string`                                                                 | —           |

### 事件

| 事件    | 说明                                     |
| ------- | ---------------------------------------- |
| `close` | MouseEvent，只通知关闭，由调用方移除标签 |

### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 标签内容 |
