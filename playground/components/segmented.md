<script setup lang="ts">
import SegmentedDemo from '../examples/SegmentedDemo.vue'
</script>

# Segmented 分段选择

在少量互斥视图间切换，选中状态由 v-model 管理

## 基础用法

<DemoExample>

<ClientOnly>
  <SegmentedDemo />
</ClientOnly>

<template #source>

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

</template>

</DemoExample>

## 用法说明

每项使用稳定的 `value`，通过控件 `aria-label` 或所属 `ZFormItem` 的标签向辅助技术说明用途

默认宽度由完整标签决定，需要铺满容器时使用 `w-full`。空间不足时在控件内部横向滚动，标签保持单行；选中滑块随选项位置和宽度平滑移动，减少动态效果偏好下立即更新

方向键切换相邻可用选项，Home / End 跳到首尾可用选项，禁用项不参与切换

## Segmented API {#api}

### 属性

| 属性         | 说明                                       | 类型                              | 默认值      |
| ------------ | ------------------------------------------ | --------------------------------- | ----------- |
| `v-model`    | 当前选项值                                 | `string`                          | 必填        |
| `aria-label` | 选项组名称，未设置时沿用 FormItem 标签     | `string`                          | —           |
| `options`    | 选项包含 label、value，可选 icon、disabled | `SegmentedOption[]`               | 必填        |
| `display`    | 显示文本或图标                             | `'label' \| 'icon'`               | `'label'`   |
| `size`       | 尺寸                                       | `'small' \| 'default' \| 'large'` | `'default'` |
| `disabled`   | 禁用整组                                   | `boolean`                         | `false`     |

### 事件

| 事件                | 说明                 |
| ------------------- | -------------------- |
| `update:modelValue` | string，绑定值变化   |
| `change`            | string，用户切换选项 |

### 实例

`focus()` 聚焦当前可通过 Tab 访问的选项
