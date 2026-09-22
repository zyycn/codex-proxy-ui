<script setup lang="ts">
import TableToolsDemo from '../examples/TableToolsDemo.vue'
</script>

# Table 分页与列设置

将分页、列显隐与排序组合到表格，不把业务数据请求耦合进基础组件

## 交互示例

<ClientOnly>
  <div class="vp-raw demo">
    <TableToolsDemo />
  </div>
</ClientOnly>

## 使用要点

### BaseTablePagination

`pagination` 包含 `currentPage`、`pageSize`、`total` 与可选的 `pageSizes`

通过 `pageChange`、`pageSizeChange` 更新数据，`loading` 禁用翻页操作

### BaseTableColumnSettings

`options` 描述列，`change`、`reorder`、`reset` 分别处理显隐、顺序与恢复默认

与 `useTableColumns` 配合，可按独立的 `tableId` 在本地保留列偏好，设置 `hideable: false` 保留必要列

示例只保存自己的列偏好，点击列设置中的恢复按钮可清除

## 示例源码

<<< ../examples/TableToolsDemo.vue
