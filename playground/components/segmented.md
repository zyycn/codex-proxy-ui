<script setup lang="ts">
import SegmentedDemo from '../examples/SegmentedDemo.vue'
</script>

# Segmented 分段选择

在少量互斥视图间切换，选中状态由 v-model 管理

## 交互示例

<ClientOnly>
  <SegmentedDemo />
</ClientOnly>

## 使用要点

每项使用稳定的 `value`，通过控件 `aria-label` 或所属 `ZFormItem` 的标签向辅助技术说明用途

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZSegmented } from '@codex-proxy/ui'
import { ref } from 'vue'

const view = ref('installed')
const options = [
  { label: '已安装', value: 'installed' },
  { label: '扩展页', value: 'extensions' },
]
</script>

<template>
  <ZSegmented v-model="view" aria-label="插件视图" :options="options" />
</template>
```

:::

## API

### 属性

| 属性         | 类型                              | 默认值      | 说明                                       |
| ------------ | --------------------------------- | ----------- | ------------------------------------------ |
| `v-model`    | `string`                          | 必填        | 当前选项值                                 |
| `aria-label` | `string`                          | —           | 选项组名称，未设置时沿用 FormItem 标签     |
| `options`    | `SegmentedOption[]`               | 必填        | 选项包含 label、value，可选 icon、disabled |
| `display`    | `'label' \| 'icon'`               | `'label'`   | 显示文本或图标                             |
| `size`       | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸                                       |
| `disabled`   | `boolean`                         | `false`     | 禁用整组                                   |

### 事件

| 事件                | 说明                 |
| ------------------- | -------------------- |
| `update:modelValue` | string，绑定值变化   |
| `change`            | string，用户切换选项 |

### 实例

`focus()` 聚焦当前可通过 Tab 访问的选项
