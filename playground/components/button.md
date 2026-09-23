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

`BaseIconButton` 为 Lucide 图标提供默认尺寸：`sm` 为 14px、`md` 为 16px、`lg` 为 18px，可通过图标自身的 `size` 或尺寸类覆盖，按钮点击区域保持不变

## 示例源码

<<< ../examples/ButtonsDemo.vue
