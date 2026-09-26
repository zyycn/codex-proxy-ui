# v0.3.0

## 接入与构建

- 新增 `@codex-proxy/ui/vite` 入口，使用默认导出 `CodexProxyUI` 集中配置源码联调、共享依赖和开发服务文件访问范围
- 普通开发与生产构建统一使用编译产物，修复开发模式中源码与预构建入口混用导致 Toast 状态分离、通知不显示的问题
- 组件入口、样式和类型声明保持公开路径，整理组件文件命名，拆分 Select、Popover 的状态与定位逻辑，复用表单字段上下文

## 文档与预览

- Playground 按组件重新组织导航，表格的分页和列设置作为下级内容，示例区与配置区明确分层
- 补齐 27 个组件文档页面的 API 说明，提供 28 段可独立复制的 Vue 用法代码
- 预览区域沿用主程序的主题背景，调整导航间距和选中层级，加入主仓库图标与链接
- 正式发版自动构建并部署 [Playground](https://zyycn.github.io/codex-proxy-ui/)，预发行不覆盖在线站点
- 移除仓库内的独立测试脚本和测试示例，保留 lint、类型检查与构建检查

## 升级说明

默认开发入口不再直接解析到源码，联合修改组件时通过 `CodexProxyUI({ source: new URL(...) })` 显式指定本地 UI 仓库，详见[源码联调指南](https://zyycn.github.io/codex-proxy-ui/guide/development)

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.3.0/codex-proxy-ui-0.3.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
