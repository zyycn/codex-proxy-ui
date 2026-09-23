# 安装与按需使用

从 GitHub Release 安装固定版本，包名与导入路径保持 `@codex-proxy/ui`

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.1.0/codex-proxy-ui-0.1.0.tgz
```

提交消费方锁文件以固定下载地址和完整性摘要，Release 提供独立的 `.sha256` 校验文件。当前不通过 npm registry 分发；本地开发仍可使用 `pnpm pack` 或[源码联调](./development)。

## 组件入口

根入口支持静态具名导入和 tree-shaking，也提供独立组件入口

```ts
import { BaseButton } from '@codex-proxy/ui'
// 或只加载指定组件入口
import { BaseButton as Button } from '@codex-proxy/ui/button'
import '@codex-proxy/ui/styles.css'
```

Vue 作为 peer dependency，不打进 UI 包

在应用客户端入口按 [主题指南](./theme) 初始化主题变量。SSR 应在客户端生命周期内调用，不要在服务端访问 `document`。

## 样式边界

JavaScript 入口不自动加载全库样式，纯主题或工具导入不会带入组件 CSS

`styles.css` 是共享基线与完整 utility 样式，需要显式导入一次；它不是随 JavaScript 自动裁剪的逐组件 CSS

使用 Tailwind CSS 4 编写页面时，在消费方 CSS 中加入主题映射

```css
@import 'tailwindcss/theme.css' layer(theme);
@import '@codex-proxy/ui/tailwind.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

## 类型

所有公开入口提供类型声明，组件采用 Vue SFC 与 `<script setup lang="ts">`
