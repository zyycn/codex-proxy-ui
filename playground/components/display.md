<script setup lang="ts">
import DisplayDemo from '../examples/DisplayDemo.vue'
</script>

# Tag 标签与卡片

使用语义标签呈现状态，卡片聚合相关内容

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <DisplayDemo />
  </div>
</ClientOnly>

## 使用要点

`type` 控制标签状态，`closable` 只发出关闭事件，由调用方移除数据

## 示例源码

<<< ../examples/DisplayDemo.vue
