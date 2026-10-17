# v0.5.0

## 新增

- 新增 `ZDatePicker`，支持日期、周、月份、年份、季度、日期时间、多选与范围选择，提供格式化、快捷选项、禁用日期、可编辑输入和表单校验
- 日期范围共用一个输入框外观，清空按钮可通过 `clearable` 控制，未提供 `shortcuts` 时不显示快捷选项面板
- `ZPopover` 新增 `enterable`、`showAfter`、`hideAfter` 和 `teleported`，可控制鼠标进入浮层、显隐延迟及挂载位置

## 调整与修复

- 修复 Popover 在锚点移除或清空时退场位置跳动，以及浮层内部操作和焦点归还导致意外重开的情况
- Input、Select、DatePicker 统一使用轻量的叉号清空按钮
- Input、Select、Textarea 默认宽度为容器的 `100%`；InputNumber 默认为 `150px`、小号为 `120px`；DatePicker 按日期类型提供默认宽度，支持窄容器收缩和调用方覆盖

## 升级提示

- 行内使用 Select 时为控件或父容器设置宽度；现有显式 `class / style` 宽度继续生效
- Popover 默认允许鼠标进入，移出后延迟 `200ms` 关闭；`hoverDelay` 保留，设置 `showAfter` 时优先使用后者

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.5.0/codex-proxy-ui-0.5.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
