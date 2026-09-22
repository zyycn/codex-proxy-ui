<script setup lang="ts">
import RangeDemo from '../examples/RangeDemo.vue'
</script>

# Range 滑块

连续调节数值，支持键盘操作、步长和禁用状态

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <RangeDemo />
  </div>
</ClientOnly>

## 使用要点

`v-model` 绑定数值，`min`、`max`、`step` 定义可选范围

`label` 是必填的可访问名称，`unit` 补充读屏数值单位，`disabled` 禁用交互

## 示例源码

<<< ../examples/RangeDemo.vue
