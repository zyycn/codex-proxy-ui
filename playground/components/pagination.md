<script setup lang="ts">
import PaginationDemo from '../examples/PaginationDemo.vue'
</script>

# Pagination 分页

独立控制页码与每页条数，表格和其他列表共用

<ClientOnly>
  <PaginationDemo />
</ClientOnly>

```vue
<script setup lang="ts">
import { ZPagination } from '@codex-proxy/ui/pagination'
import { ref } from 'vue'

const page = ref(1)
const size = ref(20)
</script>

<template>
  <ZPagination v-model:current-page="page" v-model:page-size="size" :total="123" />
</template>
```

## API

| 属性                   | 类型       | 默认值              | 说明         |
| ---------------------- | ---------- | ------------------- | ------------ |
| `v-model:current-page` | `number`   | `1`                 | 当前页码     |
| `v-model:page-size`    | `number`   | `20`                | 每页条数     |
| `total`                | `number`   | 必填                | 总条数       |
| `page-sizes`           | `number[]` | `[10, 20, 50, 100]` | 条数选项     |
| `disabled`             | `boolean`  | `false`             | 禁用全部操作 |

用户操作分别更新对应模型并发送 current-change(page)、size-change(size)。条数变化不隐式重置页码、不请求数据；调用方需要重置时在 size-change 中处理

超出总页数的模型只限制显示与操作范围，程序更新不产生用户事件。没有数据时显示第 1 页。组件不提供自定义插槽
