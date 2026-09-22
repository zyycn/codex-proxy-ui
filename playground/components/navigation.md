<script setup lang="ts">
import NavigationDemo from '../examples/NavigationDemo.vue'
</script>

# Segmented 分段选择

在少量互斥视图间切换，选中状态由 v-model 管理

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <NavigationDemo />
  </div>
</ClientOnly>

## 使用要点

每项使用稳定的 `value`，控件 `label` 向辅助技术说明用途

## 示例源码

<<< ../examples/NavigationDemo.vue
