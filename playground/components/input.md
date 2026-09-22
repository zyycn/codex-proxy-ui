<script setup lang="ts">
import InputsDemo from '../examples/InputsDemo.vue'
</script>

# Input 输入与数字

字段标签、输入框与数字步进保持同一高度和对齐

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <InputsDemo />
  </div>
</ClientOnly>

## 使用要点

`BaseFormItem` 关联标签与控件，`BaseNumberInput` 使用 `min`、`max` 与 `step` 约束数值

## 示例源码

<<< ../examples/InputsDemo.vue
