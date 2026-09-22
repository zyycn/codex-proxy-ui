<script setup lang="ts">
import ScrollbarDemo from '../examples/ScrollbarDemo.vue'
</script>

# Scrollbar 滚动容器

使用原生滚动行为，统一滚动条外观与内容区域尺寸

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <ScrollbarDemo />
  </div>
</ClientOnly>

## 使用要点

`height` 或 `maxHeight` 约束容器高度，`horizontal` 开启横向滚动，`vertical` 默认开启

`alwaysVisible` 控制滚动条常显，`scroll` 事件返回 `scrollTop` 与 `scrollLeft`

## 示例源码

<<< ../examples/ScrollbarDemo.vue
