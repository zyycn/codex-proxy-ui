<script setup lang="ts">
import ModalDemo from '../examples/ModalDemo.vue'
</script>

# Modal 弹窗

为独立操作提供弹窗，为补充说明提供浮层

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <ModalDemo />
  </div>
</ClientOnly>

## 使用要点

`v-model` 控制开关，弹窗管理焦点与 Escape 关闭，标题必须明确

## 示例源码

<<< ../examples/ModalDemo.vue
