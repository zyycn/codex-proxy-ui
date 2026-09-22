<script setup lang="ts">
import MarkdownDemo from '../examples/MarkdownDemo.vue'
</script>

# Markdown 内容

呈现说明与文档内容，复用统一的 Markdown 渲染边界

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <MarkdownDemo />
  </div>
</ClientOnly>

## 使用要点

通过 `source` 传入文本，不把未经处理的 HTML 直接注入页面

## 示例源码

<<< ../examples/MarkdownDemo.vue
