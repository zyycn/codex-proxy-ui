# v0.8.0

## 表单与交互

- 表单默认字段间距调整为 18px，错误提示使用 12px 字号与行高、常规字重，并保留与控件的间隔
- 表单错误提示增加展开与收起动画，显示和隐藏时保持表单布局稳定
- 表格展开行增加高度与透明度过渡，结束后恢复自然高度，支持快速反复切换
- 复选框避免连续点击时误选相邻文字，保留原生键盘操作
- 分页总数缺失或无效时显示 0，负数归零、小数取整

## 公共动画

- 提供 `z-fade`、`z-slide-fade`、`z-zoom-in-top` 三种公共 Vue Transition 名称，导入 `styles.css` 后即可复用
- Popover 默认淡入淡出，并支持通过 `transition` 属性指定过渡名称
- Select 与 DatePicker 复用轻微下移的入场动画，所有动画遵循减少动态效果的系统设置

## Markdown 与滚动容器

- Markdown 支持 GitHub 的 `NOTE`、`TIP`、`IMPORTANT`、`WARNING`、`CAUTION` 提示块，图标和颜色跟随主题，内容继续经过安全过滤
- Markdown 的 Shadow DOM 样式支持消费方配置的主题变量前缀
- Scrollbar 支持连接页面或已有滚动元素，保留原生滚动、锚点跳转和滚动位置恢复

## 文档与示例

- 调整导航品牌区、侧栏、正文和右侧目录，统一示例预览、配置区与代码展开布局
- 组件介绍按基础用法、使用说明和 API 组织，补充按钮状态及 Markdown 提示块示例
- 文档站使用统一的自定义滚动条，增加站点图标、GitHub 入口与导航点阵磨砂背景

## 主题命名空间（不兼容变更）

- 默认主题 CSS 变量、组件 DOM 类名和 utility 类名统一使用 `z`，移除原有 `cp` 命名，不保留兼容别名
- Vite 插件新增 `themePrefix` 构建配置，同时控制 CSS 变量生成与样式引用；与组件导出名、DOM 类名及 utility 类名独立
- `ThemeTokens`、`themeTokenNames` 与 `tokenOverrides` 使用不带 CSS 前缀的语义名，如 `color-primary`、`input-bg`
- 新增 `getThemeVarName()` 与 `createThemeVars()`，供 JavaScript 取色、局部主题绑定与跨页面主题传递使用

## 公开 API（不兼容变更）

- 主题入口统一为 `createTheme(options?)`、`applyTheme(root, theme)`，创建参数改为具名配置，返回 `Theme`，通过 `scheme` 表示明暗
- 主题默认值与预置集合统一为小驼峰命名；系统模式解析使用 `resolveThemeScheme()`，CSS 变量使用 `getThemeVarName()` 与 `createThemeVars()`
- 内部颜色派生、分页计算、表格布局和 Markdown 渲染工具不再从公开入口导出，公开能力见[API 文档](https://zyycn.github.io/codex-proxy-ui/guide/api)
- 通知服务提供 `NotificationConfig`、`NotificationService` 类型，颜色校验工具同时支持主入口与 `color-picker` 子路径

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.8.0/codex-proxy-ui-0.8.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
