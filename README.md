# Codex Proxy UI

面向 Vue 3 的组件库：Vue SFC、TypeScript、可定制主题，以及可交互的组件文档。不依赖特定应用的路由、状态管理或后端服务。

- 按组件组织源码，提供独立导出与类型声明。
- ESM 保留模块边界，支持 JavaScript tree-shaking。
- CSS 变量驱动主题，提供浅色、深色及密度配置。
- VitePress 文档包含分类侧边栏、搜索、交互示例和示例源码。

## 安装

需要 Vue 3.5+。首个版本尚未公开发布，目前可从本仓库生成安装包：

```bash
pnpm install --frozen-lockfile
pnpm pack --pack-destination artifacts

# 在你的 Vue 应用中安装
pnpm add /path/to/codex-proxy-ui/artifacts/codex-proxy-ui-0.1.0.tgz
```

公开发布后可通过 `pnpm add @codex-proxy/ui` 安装。

## 快速开始

在应用客户端入口导入一次样式并初始化主题，不需要安装 Tailwind：

```ts
import { applyResolvedTheme, DEFAULT_CUSTOM_THEME_COLOR, DEFAULT_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'
import '@codex-proxy/ui/styles.css'

applyResolvedTheme(
  document.documentElement,
  resolveTheme('light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR),
)
```

在 Vue 组件中直接使用：

```vue
<script setup lang="ts">
import { BaseButton, BaseCard } from '@codex-proxy/ui'
</script>

<template>
  <BaseCard>
    <BaseButton>保存</BaseButton>
  </BaseCard>
</template>
```

也可以从组件子路径导入：

```ts
import { BaseButton } from '@codex-proxy/ui/button'
import { BaseInput } from '@codex-proxy/ui/input'
```

根入口的静态具名导入和组件子路径均支持 tree-shaking。`styles.css` 包含基础重置与完整组件样式，主题变量由上述初始化步骤提供；**CSS 不随 JavaScript 自动按组件裁剪**。SSR 应在客户端生命周期内初始化主题。

## 主题

主题工具与组件独立导出：

```ts
import { resolveTheme, THEME_TOKEN_NAMES } from '@codex-proxy/ui/theme'
```

组件使用 `--cp-*` CSS 变量，主题工具负责计算配色、排版与密度。字体文件由应用自行选择。配置与示例见 [主题指南](playground/guide/theme.md)。

### Tailwind CSS 4 集成

仅当应用也使用 Tailwind 编写页面时，在应用的 CSS 构建入口加入：

```css
@import 'tailwindcss/theme.css' layer(theme);
@import '@codex-proxy/ui/tailwind.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

这个可选入口提供 `cp-*` 主题映射，并通过 Tailwind 官方 `@source` 机制注册随包发布的组件源码，使应用与组件的 utility 在同一轮构建中排序。它不扫描 `dist`，也不要求使用者知道包内目录结构。组件库自身只扫描组件源码，不扫描文档、测试或历史构建产物。

## 开发与文档

使用 Node.js 24+、pnpm 11.7：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

访问 **http://127.0.0.1:5176**。文档直接引用源码，热更新由 VitePress、Vite 和官方 Vue 插件处理，无额外 watch 服务。

```text
src/
  components/  组件 SFC、相关逻辑与各自的 index.ts
  theme/       主题类型、算法与 token
  styles/      基础样式、默认变量与 Tailwind 映射
  index.ts     公开具名导出
playground/
  .vitepress/  文档导航与主题
  components/  组件文档
  examples/    可交互的 Vue 示例
scripts/       发布包消费与 tree-shaking 检查
```

在其他 Vue 应用中链接源码的方式见 [源码联调指南](playground/guide/development.md)。生产构建使用 ESM 产物与 `.d.ts`，不依赖源码开发入口。

## 构建与验证

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm build:playground
pnpm check:package
```

`check:package` 生成真实 `.tgz`，在独立应用中安装，检查公开入口、类型、构建及 tree-shaking，不使用本地源码 alias。`prepack` 自动构建最新的 JavaScript、CSS 和类型声明。

TypeScript 使用[官方双版本方案](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60)：`@typescript/native` 指向 TypeScript 7，提供 `tsc` 检查构建脚本；`typescript` 指向官方 `@typescript/typescript6` 兼容包，提供 `vue-tsc` 与 ESLint 仍需的编译器 API。Vue SFC 的类型检查与声明生成继续由 `vue-tsc` 完成，不跳过检查。

发布配置见 [.github/workflows/release.yml](.github/workflows/release.yml)。版本标签为 `v<package.json.version>`；首次发布前需要确认包与仓库归属并配置 npm trusted publishing。
