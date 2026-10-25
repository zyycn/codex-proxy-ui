# v0.7.0

## 表单

- 扩展 `FormRules<T>`，支持类型、长度、范围、正则、嵌套字段和异步校验，校验引擎使用 `@rc-component/async-validator`
- 支持表单与字段各自设置 `label-position` 的 `left`、`right`、`top`，横向标签可指定宽度或自动对齐
- 增加字段重置、初值管理、校验回调和状态事件，可在提交失败时滚动并聚焦首个错误字段
- 修复同一字段内多个控件共用 ID 导致的标签误关联，错误提示显示时保持表单高度稳定

## 修复

- 确认弹窗没有正文时移除空内容区，收紧说明与操作按钮之间的留白
- 模态焦点管理跳过隐藏与禁用控件，并提供 `useModalFocus` 供自定义模态面板复用
- 避免窗口重新激活时因鼠标焦点恢复而意外打开悬停浮层
- 表格默认尺寸的单元格左右内边距由 16px 调整为 12px，日期面板与输入框的间距调整为 10px
- 单行省略文本保留字形上下沿，避免紧凑行高造成纵向裁切

## 主题

- 导出 `resolveThemeSeedTokens`，只读取种子值时可跳过完整色阶与 CSS Token 生成

## 升级注意

- `validate()` 与 `validateField()` 未传回调时，校验失败会 reject 字段错误对象，调用方应使用 `catch` 或改用校验回调；传入回调时，失败仍 resolve `false`
- 自定义 `validator` 改为接收 `(rule, value, callback, source, options)`，通过回调报告校验结果；异步校验可使用返回 Promise 的 `asyncValidator`，跨字段校验从业务模型读取关联值

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.7.0/codex-proxy-ui-0.7.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
