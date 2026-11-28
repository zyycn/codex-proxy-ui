<script setup lang="ts">
import DialogDemo from '../examples/DialogDemo.vue'
</script>

# Dialog 弹窗

在浮层中显示内容或处理任务。

## 基础用法

通过 `v-model` 控制弹窗的显示与隐藏，使用 `title` 设置标题。

<DemoExample>

<ClientOnly>
  <DialogDemo />
</ClientOnly>

<template #source>

<<< @/examples/DialogDemo.vue

</template>

</DemoExample>

## Dialog API {#api}

### 属性

| 属性                                                        | 说明                               | 类型                                                        | 默认值      |
| ----------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------- | ----------- |
| `v-model`                                                   | 打开状态                           | `boolean`                                                   | `false`     |
| `title`                                                     | 对话框标题                         | `string`                                                    | 必填        |
| `description`                                               | 标题说明                           | `string`                                                    | —           |
| `width`                                                     | 数字为 px；受视口宽度限制          | `number \| string`                                          | `'36rem'`   |
| `destroy-on-close`                                          | 退场后卸载插槽内容                 | `boolean`                                                   | `false`     |
| `fullscreen`                                                | 全屏显示                           | `boolean`                                                   | `false`     |
| `type`                                                      | 标题图标语义                       | `'default' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `'default'` |
| `show-close / close-on-click-modal / close-on-press-escape` | 关闭按钮、遮罩、Escape 的独立策略  | `boolean`                                                   | `true`      |
| `before-close`                                              | 用户关闭前等待回调；false 阻止关闭 | `() => boolean \| void \| Promise<boolean \| void>`         | —           |
| `draggable`                                                 | 拖动标题，全屏时关闭拖动           | `boolean`                                                   | `true`      |
| `role`                                                      | 无障碍角色                         | `'dialog' \| 'alertdialog'`                                 | `'dialog'`  |

关闭按钮、遮罩、Escape 以及实例、header 或 footer 插槽的 `close()` 都经过 `before-close`，等待期间阻止重复关闭。调用方直接修改模型不经过回调

### 事件

- 组件内发起关闭时，先触发 `close`，退场完成触发 `closed`，随后通过 `update:modelValue(false)` 回写模型
- `open / close`：打开 / 关闭开始
- `opened / closed` 对应入场和退场完成。退场被重新打开打断时跳过 `closed`

初始模型为 `true` 时也执行入场过渡。内容在首次打开时挂载，默认保留到组件卸载。需要在每次退出后释放表单或图表时，启用 `destroy-on-close`

### 插槽

`default`、`description`、`icon`

- `footer({ close })` 提供带关闭守卫的页脚操作

- `header({ titleId, close })`：自定义标题内容，关联 titleId 保留可访问名称

### 实例

- `focus()`：聚焦弹窗面板
- `close()`：请求关闭，返回 `Promise<void>`，遵循 `before-close`

### 自定义模态面板

`useModalFocus(panelRef, { isOpen, onEscape })` 提供焦点管理，可用于移动导航等自定义模态面板。打开前调用 `rememberFocus()`，挂载后调用 `focusInitial()`，将外层 `keydown` 交给 `handleKeydown`，退场完成后调用 `restoreFocus()`

面板设置 `role="dialog"`、`aria-modal="true"`、可访问名称和 `tabindex="-1"`；调用方负责遮罩、背景 `inert` 与滚动锁。`onEscape` 返回 `false` 可阻止本层处理；Tab 在可聚焦控件之间循环，退场和卸载恢复来源焦点，并避免抢走后续弹窗的焦点
