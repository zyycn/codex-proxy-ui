<script setup lang="ts">
import ButtonDemo from '../examples/ButtonDemo.vue'
</script>

# Button 按钮

触发保存、提交、删除等操作，通过颜色和样式表达操作的用途与强调程度

## 基础用法

使用 `type` 指定语义颜色，使用 `variant` 选择实体、轻表面、文本或链接样式

<DemoExample>

<ClientOnly>
  <ButtonDemo />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import type { ButtonType, ButtonVariant } from '@codex-proxy/ui'
import { ZButton } from '@codex-proxy/ui'

const types: Record<ButtonType, string> = {
  default: '默认',
  primary: '主要',
  success: '成功',
  info: '信息',
  warning: '警告',
  danger: '危险',
}
const variants: ButtonVariant[] = ['solid', 'plain', 'text', 'link']
</script>

<template>
  <div v-for="variant in variants" :key="variant" class="button-row">
    <ZButton v-for="(label, type) in types" :key="type" :type="type" :variant="variant">
      {{ label }}
    </ZButton>
  </div>
</template>

<style scoped>
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
</style>
```

</template>

</DemoExample>

## 禁用状态

设置 `disabled` 禁用按钮，禁用时不触发点击事件

<DemoExample>

<ClientOnly>
  <ButtonDemo example="disabled" />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import type { ButtonType } from '@codex-proxy/ui'
import { ZButton } from '@codex-proxy/ui'

const types: Record<ButtonType, string> = {
  default: '默认',
  primary: '主要',
  success: '成功',
  info: '信息',
  warning: '警告',
  danger: '危险',
}
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px">
    <ZButton v-for="(label, type) in types" :key="type" :type="type" disabled>
      {{ label }}
    </ZButton>
  </div>
</template>
```

</template>

</DemoExample>

## 加载状态

操作执行期间设置 `loading`，显示加载图标并阻止重复点击

<DemoExample>

<ClientOnly>
  <ButtonDemo example="loading" />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: flex; gap: 12px">
    <ZButton type="primary" loading>
      保存中
    </ZButton>
    <ZButton variant="plain" loading>
      加载中
    </ZButton>
  </div>
</template>
```

</template>

</DemoExample>

## 按钮尺寸

使用 `size` 选择小、默认或大尺寸，同一区域保持尺寸一致

<DemoExample>

<ClientOnly>
  <ButtonDemo example="sizes" />
</ClientOnly>

<template #source>

```vue
<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
</script>

<template>
  <div style="display: flex; align-items: center; gap: 12px">
    <ZButton size="small" type="primary">
      小尺寸
    </ZButton>
    <ZButton type="primary">
      中尺寸
    </ZButton>
    <ZButton size="large" type="primary">
      大尺寸
    </ZButton>
  </div>
</template>
```

</template>

</DemoExample>

## 组合配置

调整语义、样式和状态，点击按钮查看当前组合的交互效果

<ClientOnly>
  <ButtonDemo example="playground" />
</ClientOnly>

## Button API {#api}

### 属性

| 属性                 | 说明                 | 类型                                                                     | 默认值      |
| -------------------- | -------------------- | ------------------------------------------------------------------------ | ----------- |
| `type`               | 语义类型             | `'default' \| 'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` |
| `variant`            | 外观                 | `'solid' \| 'plain' \| 'text' \| 'link'`                                 | `'solid'`   |
| `size`               | 组件尺寸             | `'small' \| 'default' \| 'large'`                                        | `'default'` |
| `native-type`        | 原生按钮行为         | `'button' \| 'submit' \| 'reset'`                                        | `'button'`  |
| `loading / disabled` | 加载与禁用均阻止点击 | `boolean`                                                                | `false`     |

### 事件

- `click(event: MouseEvent)`：用户点击，禁用或加载时不触发

### 插槽

`default`、`icon`、`loading`

### 实例

`focus()`、`blur()`、`element`（原生按钮）
