<script setup lang="ts">
import FeedbackDemo from '../examples/FeedbackDemo.vue'
</script>

# Empty 与 Toast

空状态给出下一步操作，短提示反馈已经发生的结果

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <FeedbackDemo />
  </div>
</ClientOnly>

## 使用要点

页面挂载一个 `BaseToast`，通过 `toast.success` 等方法触发提示

## 示例源码

<<< ../examples/FeedbackDemo.vue
