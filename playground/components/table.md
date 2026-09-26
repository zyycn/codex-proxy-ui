<script setup lang="ts">
import TableDemo from '../examples/TableDemo.vue'
import TableToolsDemo from '../examples/TableToolsDemo.vue'
</script>

# Table 表格

声明列职责，由基础表格统一处理对齐、尺寸和内容展示

## 交互示例

<ClientOnly>
  <TableDemo />
</ClientOnly>

## 使用要点

`columns` 描述列，`rows` 提供数据，`rowKey` 保持行身份稳定

`loading` 显示内置加载反馈，无需注册指令，刷新时会保留已有数据
`showHeaderWhenEmpty` 控制空数据和初次加载时是否保留表头

::: details 查看用法代码

```vue
<script setup lang="ts">
import { BaseTable, defineTableColumns } from '@codex-proxy/ui'

const rows = [
  { id: 'workbench', name: '请求工作台', version: '0.1.0' },
  { id: 'inspector', name: '请求检查器', version: '0.2.1' },
]
const columns = defineTableColumns<typeof rows[number]>([
  { key: 'name', label: '插件', kind: 'identity' },
  { key: 'version', label: '版本', kind: 'mono', size: 'sm' },
])
</script>

<template>
  <div style="height: 280px">
    <BaseTable :columns="columns" :rows="rows" row-key="id" />
  </div>
</template>
```

:::

## 分页与列设置 {#configuration}

分页控制当前数据，列设置调整同一个表格的可见列与顺序

<ClientOnly>
  <TableToolsDemo />
</ClientOnly>

::: details 查看组合用法

```vue
<script setup lang="ts">
import { BaseTable, BaseTableColumnSettings, BaseTablePagination, defineTableColumns, useTableColumns } from '@codex-proxy/ui'
import { computed, ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(5)
const rows = Array.from({ length: 26 }, (_, index) => ({ id: index + 1, name: `配置 ${index + 1}` }))
const columns = defineTableColumns<typeof rows[number]>([
  { key: 'id', label: '序号', kind: 'mono', size: 'xs' },
  { key: 'name', label: '名称', kind: 'identity', hideable: false },
])
const { visibleColumns, columnOptions, setColumnVisible, setColumnOrder, resetColumns } = useTableColumns(columns, 'configuration-list')
const pageRows = computed(() => rows.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value))
const pagination = computed(() => ({ currentPage: currentPage.value, pageSize: pageSize.value, total: rows.length, pageSizes: [5, 10, 20] }))

function changePageSize(value: number) {
  pageSize.value = value
  currentPage.value = 1
}
</script>

<template>
  <BaseTableColumnSettings :options="columnOptions" @change="setColumnVisible" @reorder="setColumnOrder" @reset="resetColumns" />
  <div style="height: 320px">
    <BaseTable :columns="visibleColumns" :rows="pageRows" row-key="id" />
  </div>
  <BaseTablePagination :pagination="pagination" :loading="false" @page-change="currentPage = $event" @page-size-change="changePageSize" />
</template>
```

:::

### 分页 {#pagination}

`BaseTablePagination` 接收 `pagination`，包含 `currentPage`、`pageSize`、`total` 与可选的 `pageSizes`

通过 `pageChange`、`pageSizeChange` 更新数据，`loading` 禁用翻页操作

### 列设置 {#columns}

`BaseTableColumnSettings` 的 `options` 描述列，`change`、`reorder`、`reset` 处理显隐、顺序与恢复默认

与 `useTableColumns` 配合，可按独立的 `tableId` 在本地保留列偏好，设置 `hideable: false` 保留必要列

示例只保存自己的列偏好，点击列设置中的恢复按钮可清除

## API

### 属性

| 属性                                           | 类型                                           | 默认值       | 说明                            |
| ---------------------------------------------- | ---------------------------------------------- | ------------ | ------------------------------- |
| `columns`                                      | `BaseTableColumn<Row>[]`                       | 必填         | 列定义                          |
| `rows`                                         | `Row[]`                                        | 必填         | 当前页数据                      |
| `rowKey`                                       | `string \| ((row, index) => string \| number)` | `'id'`       | 稳定行标识                      |
| `selectedRowKeys / expandedRowKeys`            | `(string \| number)[]`                         | `[]`         | 选中行样式与展开行              |
| `density`                                      | `'compact' \| 'default'`                       | `'default'`  | 表格密度                        |
| `loading`                                      | `boolean`                                      | `false`      | 加载状态，刷新时保留已有行      |
| `emptyText`                                    | `string`                                       | `'暂无数据'` | 空状态文字                      |
| `showHeaderWhenEmpty / scrollbarAlwaysVisible` | `boolean`                                      | `false`      | 空数据表头与滚动条可见性        |
| `sort`                                         | `BaseTableSort`                                | —            | 排序状态，包含 key 与 direction |

### 事件

| 事件         | 说明                                                           |
| ------------ | -------------------------------------------------------------- |
| `sortChange` | BaseTableSort 或 undefined，只通知排序状态，调用方负责排序数据 |

### 插槽

| 插槽            | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| `列 key`        | 自定义单元格，接收 `{ row, value, displayValue, index }` |
| `header-列 key` | 自定义表头，接收 `{ column }`                            |
| `expanded`      | 展开内容，接收 `{ row, index }`                          |
| `empty`         | 空状态内容                                               |

### 分页属性与事件

| 属性                   | 类型                  | 默认值              | 说明                              |
| ---------------------- | --------------------- | ------------------- | --------------------------------- |
| `pagination`           | `BaseTablePagination` | 必填                | 包含 currentPage、pageSize、total |
| `pagination.pageSizes` | `number[]`            | `[10, 20, 50, 100]` | 每页条数选项                      |
| `loading`              | `boolean`             | 必填                | 加载时禁用分页操作                |

| 事件             | 参数               | 说明                                 |
| ---------------- | ------------------ | ------------------------------------ |
| `pageChange`     | `page: number`     | 请求切换页码                         |
| `pageSizeChange` | `pageSize: number` | 请求切换每页条数，调用方同时处理页码 |

### 列设置属性与事件

| 属性      | 类型                  | 默认值 | 说明                                            |
| --------- | --------------------- | ------ | ----------------------------------------------- |
| `options` | `TableColumnOption[]` | 必填   | 包含 key、label、visible、disabled、reorderable |

| 事件      | 参数                            | 说明           |
| --------- | ------------------------------- | -------------- |
| `change`  | `key: string, visible: boolean` | 更新列显隐     |
| `reorder` | `keys: string[]`                | 更新列顺序     |
| `reset`   | 无                              | 恢复默认列设置 |

分页与列设置组件不提供自定义插槽，和同一个表格的数据及列定义联动
