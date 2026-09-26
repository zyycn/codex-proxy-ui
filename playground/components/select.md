<script setup lang="ts">
import SelectDemo from '../examples/SelectDemo.vue'
</script>

# Select 选择器

从选项列表中选择一项或多项，配置区即时调整搜索、折叠与加载状态

## 交互示例

<ClientOnly>
  <SelectDemo />
</ClientOnly>

## 使用要点

`BaseSelect` 默认为单选，`v-model` 使用字符串。设置 `multiple` 后使用字符串数组，已选项以可移除标签显示，连续选择时保持菜单打开

方向键定位选项，Enter／空格选择，Esc 关闭菜单并保留外层弹窗，Tab 移动到后续控件。搜索框中的空格正常输入，Enter 选择当前结果。标签移除按钮与 `+N` 均可用键盘操作

禁用选项不能选择或移除，禁用整个控件时不可修改。异步选项暂未返回时保留已选值，不自动清空绑定。通过 `BaseFormItem` 或 `aria-label` 提供控件名称

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseFormItem, BaseSelect } from '@codex-proxy/ui'
import { ref } from 'vue'

const selected = ref<string[]>(['production'])
const options = [
  { label: '生产环境', value: 'production' },
  { label: '开发环境', value: 'development' },
  { label: '暂停使用', value: 'paused', disabled: true },
]
</script>

<template>
  <BaseFormItem label="账号分组">
    <BaseSelect v-model="selected" :options="options" multiple filterable collapse-tags collapse-tags-tooltip />
  </BaseFormItem>
</template>
```

:::

## API

### 属性

| 属性                                 | 类型                   | 默认值                  | 说明                                          |
| ------------------------------------ | ---------------------- | ----------------------- | --------------------------------------------- |
| `v-model`                            | `string \| string[]`   | 必填                    | 单选使用字符串，多选使用字符串数组            |
| `options`                            | `SelectOption[]`       | 必填                    | 包含 label、value，可选 description、disabled |
| `multiple`                           | `boolean`              | `false`                 | 开启多选                                      |
| `size`                               | `'sm' \| 'md' \| 'lg'` | `'md'`                  | 尺寸                                          |
| `placeholder / emptyText`            | `string`               | `'请选择' / '暂无选项'` | 占位与空状态文字                              |
| `disabled / loading / filterable`    | `boolean`              | `false`                 | 禁用、加载与搜索                              |
| `collapseTags / collapseTagsTooltip` | `boolean`              | `false`                 | 折叠标签与查看其余标签                        |
| `maxCollapseTags`                    | `number`               | `1`                     | 折叠时保留的标签数，至少显示一项              |

### 事件

| 事件                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `update:modelValue` | string 或 string[]，与 multiple 模式一致 |

### 插槽

| 插槽    | 说明                                |
| ------- | ----------------------------------- |
| `empty` | 无匹配选项时显示，接收 `{ search }` |
