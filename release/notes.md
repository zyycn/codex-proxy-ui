# v0.4.0

## 组件能力

- 公开组件统一为 `ZButton`、`ZSelect` 等 `Z` 前缀，模板支持 `ZButton` 与 `z-button`；实现文件使用无前缀实体名，类型、组合函数与工具按组件归属组织
- 完善按钮类型与原生属性、表单规则与字段校验、输入框清除和密码切换、数字输入精度与边界、文本域自动高度及选择器单选、多选与远程查询合同
- 提供独立 `ZPagination`，完善表格排序、列设置和键盘操作；弹窗支持异步关闭与退出后的收尾
- `ZNotification` 按需挂载通知容器，调用方无需添加宿主组件；组件库提供 `vLoading`，支持容器加载提示与内容保留

## 交互与样式

- 统一控件尺寸与紧凑图标，选择器选择前后高度保持一致，标签按内容宽度展示
- 表单错误提示不占用布局高度，错误边框沿用正常控件的悬停与聚焦行为
- Popover 与 Select 使用锚点定位并提供不支持原生锚点的浏览器回退，页面滚动时浮层跟随触发元素
- 滚动容器使用原生滚动，隐藏的滚动条轨道不拦截指针；规范 Tailwind 类名并更新组件 API 文档与交互示例
- 更新图标、Markdown、安全过滤及构建检查依赖

## 升级事项

这是包含不兼容 API 调整的版本，不提供旧名称别名或废弃入口。升级时同步组件导入、属性、事件和子路径，完整合同见组件文档

- `Base*` 导出改为 `Z*`；`BaseModal`、`BaseConfirmModal`、`BaseNumberInput`、`BaseRange`、`BaseTablePagination` 分别改为 `ZDialog`、`ZConfirmDialog`、`ZInputNumber`、`ZSlider`、`ZPagination`
- `modal`、`confirm-modal`、`number-input`、`range`、`toast` 子路径分别改为 `dialog`、`confirm-dialog`、`input-number`、`slider`、`notification`
- 使用 `ZNotification` 服务替换通知宿主与旧调用入口；全局加载指令通过 `app.directive('loading', vLoading)` 注册
- 按钮样式由 `type` 与 `variant` 配置，原生按钮类型使用 `nativeType`；尺寸统一为 `small`、`default`、`large`

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.4.0/codex-proxy-ui-0.4.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
