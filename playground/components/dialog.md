<script setup lang="ts">
import DialogDemo from '../examples/DialogDemo.vue'
</script>

# Dialog 弹窗

为需要独立处理的操作提供对话空间

## 基础用法

<DemoExample>

<ClientOnly>
  <DialogDemo />
</ClientOnly>

<template #source>

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

</template>

</DemoExample>

## 用法说明

`v-model` 控制开关，`width` 调整宽度，标题描述当前操作

关闭时保留内容直到退出动画结束，随后自动卸载主体与插槽子组件，子组件的局部状态在下次打开时重新创建

调用方的选中对象和表单数据不会随插槽卸载而重置，通常在下次打开时赋值即可，无需额外退出回调。请求、轮询等活动可在打开状态变为 `false` 时取消；确需清除明文凭据或执行其他收尾时，使用 `closed`，避免退场时内容变化

退出期间重新打开会取消本次退场，不触发 `closed`

## Dialog API {#api}

### 属性

| 属性                                                        | 说明                               | 类型                                                        | 默认值      |
| ----------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------- | ----------- |
| `v-model`                                                   | 打开状态                           | `boolean`                                                   | `false`     |
| `title`                                                     | 对话框标题                         | `string`                                                    | 必填        |
| `description`                                               | 标题说明                           | `string`                                                    | —           |
| `width`                                                     | 数字为 px；受视口宽度限制          | `number \| string`                                          | `'36rem'`   |
| `fullscreen`                                                | 全屏显示                           | `boolean`                                                   | `false`     |
| `type`                                                      | 标题图标语义                       | `'default' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `'default'` |
| `show-close / close-on-click-modal / close-on-press-escape` | 关闭按钮、遮罩、Escape 的独立策略  | `boolean`                                                   | `true`      |
| `before-close`                                              | 用户关闭前等待回调；false 阻止关闭 | `() => boolean \| void \| Promise<boolean \| void>`         | —           |
| `draggable`                                                 | 拖动标题，全屏时关闭拖动           | `boolean`                                                   | `true`      |
| `role`                                                      | 无障碍角色                         | `'dialog' \| 'alertdialog'`                                 | `'dialog'`  |

关闭按钮、遮罩、Escape 以及实例或 header 插槽的 `close()` 都经过 `before-close`，等待期间阻止重复关闭。调用方直接修改模型不经过回调

### 事件

- `update:modelValue(value: boolean)`：用户关闭请求通过后更新模型
- `open / close`：打开 / 关闭开始
- `opened / closed`：入场 / 退场完成，closed 前保留内容、滚动锁与焦点管理

### 插槽

`default`、`footer`、`description`、`icon`

- `header({ titleId, close })`：自定义标题内容，关联 titleId 保留可访问名称

### 实例

- `focus()`：聚焦弹窗面板
- `close()`：请求关闭，返回 `Promise<void>`，遵循 `before-close`

### 自定义模态面板

`useModalFocus(panelRef, { isOpen, onEscape })` 提供焦点管理，可用于移动导航等自定义模态面板。打开前调用 `rememberFocus()`，挂载后调用 `focusInitial()`，将外层 `keydown` 交给 `handleKeydown`，退场完成后调用 `restoreFocus()`

面板设置 `role="dialog"`、`aria-modal="true"`、可访问名称和 `tabindex="-1"`；调用方负责遮罩、背景 `inert` 与滚动锁。`onEscape` 返回 `false` 可阻止本层处理；Tab 在可聚焦控件之间循环，退场和卸载恢复来源焦点，并避免抢走后续弹窗的焦点
