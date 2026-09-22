# 源码联调与热更新

## 文档与组件

```bash
pnpm install --frozen-lockfile
pnpm dev
```

文档使用 VitePress，组件示例直接引用源码，HMR 由 Vite 和官方 Vue 插件处理

## 在其他应用中联调

在消费方运行 `pnpm link /path/to/codex-proxy-ui`。pnpm 11 会修改消费方的 overrides 与锁文件，恢复版本依赖时应移除对应的本地覆盖，不要撤销其他修改。

UI 包的 `development` 条件入口指向 TypeScript 与 Vue 源码，Vite 开发服务直接编译并监听变更，不需要启动额外监听脚本

消费方保留 `resolve.dedupe: ['vue']`，避免本地链接引入两份 Vue；TypeScript 可通过 `paths: { "vue": ["./node_modules/vue"] }` 统一到应用的 Vue 类型（相对应用 tsconfig）。

`styles.css` 始终提供编译好的 CSS，普通使用者无需 Tailwind。需要实时生成新增 utility 时，使用 Tailwind 4 并导入 [样式集成入口](./installation#样式边界)，它会直接监听组件源码。修改基础 CSS 和 token 时可在本库文档中即时预览，或先运行 `pnpm build` 更新消费方的完整样式。

## 生产构建

```bash
pnpm build
pnpm check:package
```

生产模式使用保留模块边界的 ESM 和 `.d.ts`，不会读取开发环境源码入口

`check:package` 使用独立消费项目检查真实发布包，不依赖文档站的源码 alias
