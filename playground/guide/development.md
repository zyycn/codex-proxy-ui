# 源码联调与热更新

## 文档与组件

```bash
pnpm install --frozen-lockfile
pnpm dev
```

文档使用 VitePress，通过共用适配器引用源码，HMR 由 Vite 和官方 Vue 插件处理。

## 在其他应用中联调

应用保留已安装的 UI 依赖，通过 Vite 适配器指定本地 UI 仓库，不需要修改依赖或锁文件：

```ts
import CodexProxyUI from '@codex-proxy/ui/vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    tailwindcss(),
    CodexProxyUI({
      source: mode === 'source'
        ? new URL('../codex-proxy-ui/', import.meta.url)
        : undefined,
    }),
  ],
}))
```

本地 UI 仓库也需安装自身依赖。运行 `vite --mode source` 后，适配器读取该仓库 `package.json` 的 `codex-proxy-source` 导出条件，映射组件、主题和样式入口；Vue 与图标依赖统一使用应用中的实例，UI 源码排除预构建，文件访问范围保留应用配置并加入 UI 仓库。

源码模式使用 Tailwind 4 编译基础样式和新增 utility，应用应导入 [样式集成入口](./installation#样式边界)。普通模式的 `styles.css` 使用完整编译产物，使用者无需 Tailwind。

Vite 适配器负责运行时解析。需要检查未发布源码的类型时，在独立的源码 tsconfig 中将 UI 公开入口映射到本地源码，并通过 `paths: { "vue": ["./node_modules/vue"] }` 统一 Vue 类型；日常类型检查继续使用已安装包的声明。

## 生产构建

```bash
pnpm build
```

普通开发和生产构建都使用保留模块边界的 ESM 和 `.d.ts`，不会自动选择源码入口。`vite build --mode source` 可验证本地源码的生产构建；应用应为联调产物设置单独输出目录。
