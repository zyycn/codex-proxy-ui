<script setup lang="ts">
import MotionIconDemo from '../examples/MotionIconDemo.vue'
</script>

# MotionIcon 动效图标

为插槽中的图标增加指针反馈，不改变图标来源与尺寸

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <MotionIconDemo />
  </div>
</ClientOnly>

## 使用要点

`variant` 支持默认的 `random` 与 `brand`，`as` 指定外层 HTML 元素

组件响应系统的减少动态效果偏好，纯装饰图标可设置 `aria-hidden`，交互操作请配合有名称的按钮使用

## 示例源码

<<< ../examples/MotionIconDemo.vue
