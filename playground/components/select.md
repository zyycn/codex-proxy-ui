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

默认宽度为容器的 `100%`，通过 `class / style` 指定固定宽度；示例容器宽 `240px`。行内布局需要给控件或父容器设置宽度

`ZSelect` 默认为单选，`v-model` 使用字符串或数字，单选空值为 undefined。设置 `multiple` 后使用同类型数组，已选项以可移除标签显示，连续选择时保持菜单打开

方向键定位选项，Enter／空格选择，Esc 关闭菜单并保留外层弹窗，Tab 移动到后续控件。搜索框中的空格正常输入，Enter 选择当前结果。标签移除按钮与 `+N` 均可用键盘操作

禁用选项不能选择或移除，禁用整个控件时不可修改。异步选项暂未返回时保留已选值，不自动清空绑定。通过 `ZFormItem` 或 `aria-label` 提供控件名称

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZFormItem, ZSelect } from '@codex-proxy/ui'
import { ref } from 'vue'

const selected = ref<string[]>(['production'])
const options = [
  { label: '生产环境', value: 'production' },
  { label: '开发环境', value: 'development' },
  { label: '暂停使用', value: 'paused', disabled: true },
]
</script>

<template>
  <ZFormItem label="账号分组">
    <ZSelect v-model="selected" :options="options" multiple filterable collapse-tags collapse-tags-tooltip />
  </ZFormItem>
</template>
```

:::

## API

### 属性

| 属性                                                   | 类型                              | 默认值                  | 说明                                                                   |
| ------------------------------------------------------ | --------------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| `v-model`                                              | `Value \| undefined` 或 `Value[]` | 必填                    | Value 为 string 或 number；单选空值 undefined，多选空值 []，0 是有效值 |
| `options`                                              | `SelectOption<Value>[]`           | 必填                    | label、value；可选 description、disabled                               |
| `size`                                                 | `'small' \| 'default' \| 'large'` | `'default'`             | 组件尺寸                                                               |
| `multiple`                                             | `boolean`                         | `false`                 | 开启多选                                                               |
| `disabled / loading / filterable / clearable / remote` | `boolean`                         | `false`                 | 禁用、加载、搜索、清空、外部筛选                                       |
| `placeholder / empty-text`                             | `string`                          | `'请选择' / '暂无选项'` | 占位和空状态                                                           |
| `collapse-tags / collapse-tags-tooltip`                | `boolean`                         | `false`                 | 折叠标签与溢出提示                                                     |
| `max-collapse-tags`                                    | `number`                          | `1`                     | 至少显示一个标签                                                       |

`remote` 关闭本地筛选，搜索输入完成后发送查询词；请求、取消和结果顺序由调用方管理。搜索与移除按钮不继承字段的 ID、必填和错误状态

### 事件

| 事件                         | 参数         | 说明                            |
| ---------------------------- | ------------ | ------------------------------- |
| `update:modelValue / change` | 当前模型值   | 模型变化 / 用户选择、移除或清空 |
| `clear`                      | 无           | 清空选择                        |
| `remove-tag`                 | `Value`      | 用户移除一个标签                |
| `visible-change`             | `boolean`    | 菜单显隐变化                    |
| `query-change`               | `string`     | 搜索输入完成                    |
| `focus / blur`               | `FocusEvent` | 触发控件焦点变化                |

### 插槽与实例

- `option({ option, index, selected, disabled })`：自定义选项内容
- `empty({ search })`：无匹配选项
- 实例：`focus()`、`blur()`、`clear()`、`open()`、`close()`
