# v0.2.0

## 新增功能

- `BaseSelect` 支持 `multiple` 多选，以可移除标签展示选中项，提供 `collapse-tags`、`collapse-tags-tooltip` 和 `max-collapse-tags` 控制折叠数量及隐藏标签浮层。
- 支持选项搜索、加载状态和自定义空状态，补齐多选、标签移除与搜索的键盘操作；单选用法保持兼容。

## 体验优化

- 下拉菜单使用浏览器原生锚点跟随滚动，不支持时回退到坐标定位；移除浮层的额外滚动节流，并在控件尺寸变化时更新位置。
- 空状态复用组件库统一图标与样式；修复文档预览中弹出菜单内边距被样式覆盖的问题。

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.2.0/codex-proxy-ui-0.2.0.tgz
```

需要 Vue 3.5+。包名仍为 `@codex-proxy/ui`。
