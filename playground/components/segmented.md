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

每项使用稳定的 `value`，控件 `aria-label` 向辅助技术说明用途

默认宽度由完整标签决定，需要铺满容器时使用 `w-full`。空间不足时在控件内部横向滚动，标签保持单行；选中滑块随选项位置和宽度平滑移动，减少动态效果偏好下立即更新

方向键切换相邻可用选项，Home / End 跳到首尾可用选项，禁用项不参与切换

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
| `aria-label` | `string`                          | 必填        | 选项组的可访问名称                         |
| `options`    | `SegmentedOption[]`               | 必填        | 选项包含 label、value，可选 icon、disabled |
| `display`    | `'label' \| 'icon'`               | `'label'`   | 显示文本或图标                             |
| `size`       | `'small' \| 'default' \| 'large'` | `'default'` | 尺寸                                       |
| `disabled`   | `boolean`                         | `false`     | 禁用整组                                   |

### 事件

| 事件                | 说明               |
| ------------------- | ------------------ |
| `update:modelValue` | string，绑定值变化 |
