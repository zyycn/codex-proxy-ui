import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/postcss'
import { defineConfig, postcssIsolateStyles } from 'vitepress'

export default defineConfig({
  title: 'Codex Proxy UI',
  description: '为插件与管理工具构建一致的界面',
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    nav: [{ text: '指南', link: '/guide/installation' }, { text: '组件', link: '/components/' }],
    sidebar: [
      { text: '开始使用', items: [
        { text: '概览', link: '/' },
        { text: '组件总览', link: '/components/' },
        { text: '安装与按需使用', link: '/guide/installation' },
        { text: '源码联调与热更新', link: '/guide/development' },
        { text: '主题', link: '/guide/theme' },
      ] },
      { text: '基础组件', items: [
        { text: 'Button 按钮与图标按钮', link: '/components/button' },
        { text: 'Tag 标签与卡片', link: '/components/display' },
        { text: 'MotionIcon 动效图标', link: '/components/motion-icon' },
      ] },
      { text: '布局与导航', items: [
        { text: 'PageHeader 页头', link: '/components/page-header' },
        { text: 'Segmented 分段选择', link: '/components/navigation' },
        { text: 'MenuItem 菜单项', link: '/components/menu-item' },
        { text: 'Scrollbar 滚动容器', link: '/components/scrollbar' },
      ] },
      { text: '表单', items: [
        { text: 'Form 表单与输入', link: '/components/input' },
        { text: 'Select 选择控件', link: '/components/select' },
        { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
        { text: 'Range 滑块', link: '/components/range' },
      ] },
      { text: '数据展示', items: [
        { text: 'Table 表格', link: '/components/table' },
        { text: 'Table 分页与列设置', link: '/components/table-tools' },
        { text: 'Markdown 内容', link: '/components/markdown' },
      ] },
      { text: '反馈与浮层', items: [
        { text: 'Modal 弹窗与气泡', link: '/components/modal' },
        { text: 'ConfirmModal 确认弹窗', link: '/components/confirm-modal' },
        { text: 'Empty、Skeleton 与 Toast', link: '/components/feedback' },
      ] },
    ],
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一页', next: '下一页' },
    sidebarMenuLabel: '组件目录',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '主题',
    search: { provider: 'local' },
  },
  vite: {
    // VitePress 稳定版与库构建使用不同主版本的 Vite，使用官方 PostCSS 集成避免耦合插件类型。
    css: { postcss: { plugins: [
      tailwindcss(),
      postcssIsolateStyles({
        includeFiles: [/vitepress\/dist\/client\/theme-default\/styles\/(?:base|components\/vp-doc)\.css/u],
        // 浮层被 Teleport 到 body，仍需避开文档基线，而不是给示例组件加覆盖样式。
        prefix: ':not(:where(.vp-raw, .vp-raw *, [role="presentation"], [role="presentation"] *, [role="status"], [role="status"] *, [role="alert"], [role="alert"] *))',
      }),
    ] } },
    server: { watch: { ignored: ['**/.vitepress/dist/**'] } },
    resolve: {
      dedupe: ['vue'],
      alias: [
        { find: '@codex-proxy/ui/theme', replacement: fileURLToPath(new URL('../../src/theme/index.ts', import.meta.url)) },
        { find: '@codex-proxy/ui/styles.css', replacement: fileURLToPath(new URL('../../src/styles/index.css', import.meta.url)) },
        { find: '@codex-proxy/ui/tailwind.css', replacement: fileURLToPath(new URL('../../src/styles/tailwind.css', import.meta.url)) },
        { find: /^@codex-proxy\/ui$/, replacement: fileURLToPath(new URL('../../src/index.ts', import.meta.url)) },
        { find: /^@codex-proxy\/ui\/(.+)$/, replacement: fileURLToPath(new URL('../../src/components/$1/index.ts', import.meta.url)) },
      ],
    },
  },
})
