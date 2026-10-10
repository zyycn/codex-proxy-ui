<script setup lang="ts">
import DialogDemo from '../examples/DialogDemo.vue'
</script>

# Dialog 弹窗

为需要独立处理的操作提供对话空间

## 交互示例

<ClientOnly>
  <DialogDemo />
</ClientOnly>

::: details 查看用法代码

```vue
<script setup lang="ts">
import { ZButton, ZDialog } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <ZButton @click="open = true">
    编辑配置
  </ZButton>
  <ZDialog v-model="open" title="编辑配置" description="变更在保存后生效">
    <p>在这里放置表单或其他内容</p>
    <template #footer>
      <ZButton @click="open = false">
        关闭
      </ZButton>
    </template>
  </ZDialog>
</template>
```

:::

## 使用要点

`v-model` 控制开关，`width` 调整宽度，标题描述当前操作

关闭时保留内容直到退出动画结束，随后自动卸载主体与插槽子组件，子组件的局部状态在下次打开时重新创建

调用方的选中对象和表单数据不会随插槽卸载而重置，通常在下次打开时赋值即可，无需额外退出回调。请求、轮询等活动可在打开状态变为 `false` 时取消；确需清除明文凭据或执行其他收尾时，使用 `closed`，避免退场时内容变化

退出期间重新打开会取消本次退场，不触发 `closed`

## API

### 属性

| 属性                                                        | 类型                                                        | 默认值      | 说明                               |
| ----------------------------------------------------------- | ----------------------------------------------------------- | ----------- | ---------------------------------- |
| `v-model`                                                   | `boolean`                                                   | `false`     | 打开状态                           |
| `title`                                                     | `string`                                                    | 必填        | 对话框标题                         |
| `description`                                               | `string`                                                    | —           | 标题说明                           |
| `width`                                                     | `number \| string`                                          | `'36rem'`   | 数字为 px；受视口宽度限制          |
| `fullscreen`                                                | `boolean`                                                   | `false`     | 全屏显示                           |
| `type`                                                      | `'default' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `'default'` | 标题图标语义                       |
| `show-close / close-on-click-modal / close-on-press-escape` | `boolean`                                                   | `true`      | 关闭按钮、遮罩、Escape 的独立策略  |
| `before-close`                                              | `() => boolean \| void \| Promise<boolean \| void>`         | —           | 用户关闭前等待回调；false 阻止关闭 |
| `draggable`                                                 | `boolean`                                                   | `true`      | 拖动标题，全屏时关闭拖动           |
| `role`                                                      | `'dialog' \| 'alertdialog'`                                 | `'dialog'`  | 无障碍角色                         |

`before-close` 只处理关闭按钮、遮罩和 Escape，调用方直接修改模型不经过回调。等待期间阻止重复关闭

### 事件与插槽

- `update:modelValue(value: boolean)`：用户关闭请求通过后更新模型
- `open / close`：打开 / 关闭开始
- `opened / closed`：入场 / 退场完成，closed 前保留内容、滚动锁与焦点管理
- 插槽：`default`、`footer`、`description`、`icon`
- `header({ titleId, close })`：自定义标题内容，关联 titleId 保留可访问名称
