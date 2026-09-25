<script setup lang="ts">
import SelectDemo from '../examples/SelectDemo.vue'
</script>

# Select 选择控件

用选择器、复选、单选与开关表达不同选择关系

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <SelectDemo />
  </div>
</ClientOnly>

## 使用要点

`BaseSelect` 默认为单选，`v-model` 使用字符串。设置 `multiple` 后使用字符串数组，已选项以可移除标签显示，连续选择时保持菜单打开

| 属性                    | 默认值     | 用途                                              |
| ----------------------- | ---------- | ------------------------------------------------- |
| `multiple`              | `false`    | 开启多选，`v-model` 为 `string[]`                 |
| `collapse-tags`         | `false`    | 将超出数量的标签折叠成 `+N`                       |
| `max-collapse-tags`     | `1`        | 折叠时保留的标签数量，至少显示一项                |
| `collapse-tags-tooltip` | `false`    | 悬停、聚焦或点击 `+N` 查看并移除其余标签          |
| `filterable`            | `false`    | 在菜单中按名称与描述筛选                          |
| `loading`               | `false`    | 显示加载状态，暂停选项选择                        |
| `emptyText`             | `暂无选项` | 无选项时的文案，也可使用 `empty` 插槽提供重试操作 |

方向键定位选项，Enter／空格选择，Esc 关闭菜单并保留外层弹窗，Tab 移动到后续控件。搜索框中的空格正常输入，Enter 选择当前结果。标签移除按钮与 `+N` 均可用键盘操作

禁用选项不能选择或移除，禁用整个控件时不可修改。异步选项暂未返回时保留已选值，不自动清空绑定。通过 `BaseFormItem` 或 `aria-label` 提供控件名称

## 示例源码

<<< ../examples/SelectDemo.vue
