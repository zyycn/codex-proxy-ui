<script setup lang="ts">
import LoadingDemo from '../examples/LoadingDemo.vue'
</script>

# Loading 加载

通过 `v-loading` 在容器内显示加载状态

## 交互示例

<ClientOnly>
  <LoadingDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { vLoading } from '@codex-proxy/ui/loading'
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div v-loading="loading" style="height: 176px">
    待加载的内容
  </div>
</template>
```

:::

## 使用要点

在 `<script setup>` 中导入 `vLoading` 即可局部使用。全局使用时在应用入口注册

```ts
import { vLoading } from '@codex-proxy/ui'

app.directive('loading', vLoading)
```

布尔值控制显隐；需要文案或保留内容时传入 `{ loading, text, preserveContent }`。蒙层只覆盖当前容器，容器尺寸由内容或调用方控制

指令用于原生容器元素；基础组件自身的 `loading` 属性按对应组件文档使用

## API

### 指令值

`LoadingBinding` 为 `boolean | LoadingOptions`

| LoadingOptions    | 类型      | 默认值     | 说明                         |
| ----------------- | --------- | ---------- | ---------------------------- |
| `loading`         | `boolean` | `false`    | 控制蒙层显隐                 |
| `text`            | `string`  | `'加载中'` | 加载文案，空文本使用默认值   |
| `preserveContent` | `boolean` | `false`    | 保留内容外观，移除背景与模糊 |

显示时设置 `aria-busy`，必要时建立相对定位；隐藏或卸载时移除蒙层并还原指令接管的定位、溢出类和 `aria-busy`
