<script setup lang="ts">
import MenuItemDemo from '../examples/MenuItemDemo.vue'
</script>

# MenuItem 菜单项

用于操作列表，可组合图标、禁用、加载与危险操作

## 基础用法

<DemoExample>

<ClientOnly>
  <MenuItemDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZMenuItem } from '@codex-proxy/ui'
import { ref } from 'vue'

const action = ref('尚未操作')
</script>

<template>
  <ZMenuItem @click="action = '编辑'">
    编辑
  </ZMenuItem>
  <ZMenuItem type="danger" @click="action = '移除'">
    移除
  </ZMenuItem>
  <output aria-label="当前操作">{{ action }}</output>
</template>
```

</template>

</DemoExample>

## 用法说明

默认插槽提供操作文字，`icon` 插槽放置图标，`type="danger"` 标识危险操作

`disabled` 与 `loading` 阻止点击，组件是按钮，不负责菜单容器的定位与开关

## MenuItem API {#api}

### 属性

| 属性                 | 说明                 | 类型                    | 默认值      |
| -------------------- | -------------------- | ----------------------- | ----------- |
| `type`               | 普通或危险操作       | `'default' \| 'danger'` | `'default'` |
| `disabled / loading` | 禁用或加载时阻止点击 | `boolean`               | `false`     |

### 事件

| 事件    | 说明                                  |
| ------- | ------------------------------------- |
| `click` | 原生 MouseEvent，加载与禁用时不会触发 |

### 插槽

| 插槽             | 说明               |
| ---------------- | ------------------ |
| `default`        | 菜单文字           |
| `icon / loading` | 普通图标或加载图标 |
