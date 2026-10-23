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

`columns` 描述列，`data` 提供数据，`row-key` 保持行身份稳定

`loading` 显示内置加载反馈，无需注册指令，刷新时会保留已有数据
`show-header-when-empty` 控制空数据和初次加载时是否保留表头

::: details 查看用法代码

```vue
<script setup lang="ts">
import { defineTableColumns, ZTable } from '@codex-proxy/ui'

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
    <ZTable :columns="columns" :data="rows" row-key="id" />
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
import { defineTableColumns, useTableColumns, ZPagination, ZTable, ZTableColumnSettings } from '@codex-proxy/ui'
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
  <ZTableColumnSettings :options="columnOptions" @change="setColumnVisible" @reorder="setColumnOrder" @reset="resetColumns" />
  <div style="height: 320px">
    <ZTable :columns="visibleColumns" :data="pageRows" row-key="id" />
  </div>
  <ZPagination v-bind="pagination" @current-change="currentPage = $event" @size-change="changePageSize" />
</template>
```

:::

### 分页

[ZPagination](./pagination.md) 使用独立的页码与条数模型，数据请求和条数变化时的页码处理由调用方负责

### 列设置 {#columns}

`ZTableColumnSettings` 的 `options` 描述列，`change`、`reorder`、`reset` 处理显隐、顺序与恢复默认

与 `useTableColumns` 配合，可按独立的 `tableId` 在本地保留列偏好，设置 `hideable: false` 保留必要列

示例只保存自己的列偏好，点击列设置中的恢复按钮可清除

## API

### 属性

| 属性                                                | 类型                                           | 默认值       | 说明                            |
| --------------------------------------------------- | ---------------------------------------------- | ------------ | ------------------------------- |
| `columns`                                           | `TableColumn<Row>[]`                           | 必填         | 列定义                          |
| `data`                                              | `Row[]`                                        | 必填         | 当前页数据                      |
| `row-key`                                           | `string \| ((row, index) => string \| number)` | `'id'`       | 稳定行标识                      |
| `selected-row-keys / expanded-row-keys`             | `(string \| number)[]`                         | `[]`         | 选中行样式与展开行              |
| `size`                                              | `'small' \| 'default' \| 'large'`              | `'default'`  | 表格密度                        |
| `loading`                                           | `boolean`                                      | `false`      | 加载状态，刷新时保留已有行      |
| `empty-text`                                        | `string`                                       | `'暂无数据'` | 空状态文字                      |
| `show-header-when-empty / scrollbar-always-visible` | `boolean`                                      | `false`      | 空数据表头与滚动条可见性        |
| `sort`                                              | `TableSort`                                    | —            | 排序状态，包含 key 与 direction |

### 列合同

TableColumn 的 width、minWidth 为像素数值；fixed 支持 true（左侧）、left、right 或 false（取消固定），formatter(value, row) 生成展示值。kind 和列 size 是项目已有的列展示预设，不与组件尺寸共用枚举

同一列的表头和单元格使用相同内边距，小尺寸默认左右各 12px，默认和大尺寸各 16px；末列保持相同规则。选择、展开和操作列使用各自的列预设

### 事件

| 事件          | 说明                                                       |
| ------------- | ---------------------------------------------------------- |
| `sort-change` | TableSort 或 undefined，只通知排序状态，调用方负责排序数据 |

### 插槽

| 插槽            | 说明                                                     |
| --------------- | -------------------------------------------------------- |
| `列 key`        | 自定义单元格，接收 `{ row, value, displayValue, index }` |
| `header-列 key` | 自定义表头，接收 `{ column }`                            |
| `expanded`      | 展开内容，接收 `{ row, index }`                          |
| `empty`         | 空状态内容                                               |

### 列设置属性与事件

| 属性      | 类型                  | 默认值 | 说明                                            |
| --------- | --------------------- | ------ | ----------------------------------------------- |
| `options` | `TableColumnOption[]` | 必填   | 包含 key、label、visible、disabled、reorderable |

| 事件      | 参数                            | 说明           |
| --------- | ------------------------------- | -------------- |
| `change`  | `key: string, visible: boolean` | 更新列显隐     |
| `reorder` | `keys: string[]`                | 更新列顺序     |
| `reset`   | 无                              | 恢复默认列设置 |

列设置组件不提供自定义插槽，和同一个表格的数据及列定义联动
