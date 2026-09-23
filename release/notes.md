# v0.1.0

首个独立 UI 组件库版本，通过 GitHub Release 分发，无需检出网关或组件库源码即可安装。

- 提供 Vue 3 表单、弹窗、导航、表格、反馈等基础组件，支持按组件导入与 TypeScript 类型声明。
- 统一浅色、深色主题与密度设置，提供独立主题工具和可选的 Tailwind CSS 4 集成入口。
- 图标按钮支持默认尺寸与调用方自定义尺寸；下拉选择器优先响应 Escape，避免同时关闭外层弹窗。
- 提供交互式组件文档，以及真实安装包的独立消费、样式和 tree-shaking 检查。

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.1.0/codex-proxy-ui-0.1.0.tgz
```

需要 Vue 3.5+。包名仍为 `@codex-proxy/ui`；如已有本地 pnpm override，请移除该覆盖并重新生成锁文件。
