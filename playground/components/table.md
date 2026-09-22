<script setup lang="ts">
import TableDemo from '../examples/TableDemo.vue'
</script>

# Table 表格

声明列职责，由基础表格统一处理对齐、尺寸和内容展示

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <TableDemo />
  </div>
</ClientOnly>

## 使用要点

`columns` 描述列，`rows` 提供数据，`rowKey` 保持行身份稳定

`loading` 显示内置加载反馈，无需注册指令，刷新时会保留已有数据
`showHeaderWhenEmpty` 控制空数据和初次加载时是否保留表头

## 示例源码

<<< ../examples/TableDemo.vue
