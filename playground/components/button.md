<script setup lang="ts">
import ButtonsDemo from '../examples/ButtonsDemo.vue'
</script>

# Button 按钮

区分主要、次要、禁用与加载状态，纯图标操作提供可访问名称

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <ButtonsDemo />
  </div>
</ClientOnly>

## 使用要点

`variant` 控制操作层级，`loading` 防止重复提交，图标按钮必须提供 `label`

## 示例源码

<<< ../examples/ButtonsDemo.vue
