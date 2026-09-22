<script setup lang="ts">
import ConfirmModalDemo from '../examples/ConfirmModalDemo.vue'
</script>

# ConfirmModal 确认弹窗

提供一致的确认与取消入口，用于需要用户确认的操作

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <ConfirmModalDemo />
  </div>
</ClientOnly>

## 使用要点

`v-model` 控制显隐，`title` 与 `description` 说明操作，`destructive` 强调危险行为

监听 `confirm` 执行操作，成功后由调用方关闭弹窗；异步操作期间设置 `loading`，以避免重复提交

`confirmText`、`cancelText` 定义按钮文案，`confirmDisabled` 禁用确认

## 示例源码

<<< ../examples/ConfirmModalDemo.vue
