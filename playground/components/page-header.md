<script setup lang="ts">
import PageHeaderDemo from '../examples/PageHeaderDemo.vue'
</script>

# PageHeader 页头

统一页面标题、副标题与右侧操作区

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <PageHeaderDemo />
  </div>
</ClientOnly>

## 使用要点

`title` 定义页面主标题，`description` 提供简短说明，`actions` 插槽放置操作按钮

组件使用一级标题，实际页面通常只放置一个页头

## 示例源码

<<< ../examples/PageHeaderDemo.vue
