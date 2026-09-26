import tailwindcss from '@tailwindcss/postcss'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import CodexProxyUI from '../../src/vite'

export default defineConfig({
  title: 'Codex Proxy UI',
  description: '为插件与管理工具构建一致的界面',
  lang: 'zh-CN',
  cleanUrls: true,
  themeConfig: {
    logo: { src: '/logo.svg', alt: 'Codex Proxy' },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: '主仓库', link: 'https://github.com/zyycn/codex-proxy-rs' },
    ],
    sidebar: {
      '/components/': [
        { text: '组件总览', link: '/components/' },
        { text: '基础', collapsed: false, items: [
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'IconButton 图标按钮', link: '/components/icon-button' },
          { text: 'Tag 标签', link: '/components/tag' },
          { text: 'MotionIcon 动效图标', link: '/components/motion-icon' },
        ] },
        { text: '布局与导航', collapsed: false, items: [
          { text: 'Card 卡片', link: '/components/card' },
          { text: 'PageHeader 页头', link: '/components/page-header' },
          { text: 'Segmented 分段选择', link: '/components/segmented' },
          { text: 'MenuItem 菜单项', link: '/components/menu-item' },
          { text: 'Scrollbar 滚动容器', link: '/components/scrollbar' },
        ] },
        { text: '表单', collapsed: false, items: [
          { text: 'Form 表单', link: '/components/form' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'NumberInput 数字输入', link: '/components/number-input' },
          { text: 'Textarea 文本域', link: '/components/textarea' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Checkbox 复选框', link: '/components/checkbox' },
          { text: 'Radio 单选框', link: '/components/radio' },
          { text: 'Switch 开关', link: '/components/switch' },
          { text: 'ColorPicker 颜色选择', link: '/components/color-picker' },
          { text: 'Range 滑块', link: '/components/range' },
        ] },
        { text: '数据展示', collapsed: false, items: [
          { text: 'Table 表格', link: '/components/table', items: [
            { text: '分页', link: '/components/table#pagination' },
            { text: '列设置', link: '/components/table#columns' },
          ] },
          { text: 'Markdown 内容', link: '/components/markdown' },
        ] },
        { text: '反馈与浮层', collapsed: false, items: [
          { text: 'Modal 弹窗', link: '/components/modal' },
          { text: 'ConfirmModal 确认弹窗', link: '/components/confirm-modal' },
          { text: 'Popover 气泡', link: '/components/popover' },
          { text: 'Toast 消息提示', link: '/components/toast' },
          { text: 'Empty 空状态', link: '/components/empty' },
          { text: 'Skeleton 骨架屏', link: '/components/skeleton' },
        ] },
      ],
      '/': [{ text: '开始使用', items: [
        { text: '概览', link: '/' },
        { text: '安装与按需使用', link: '/guide/installation' },
        { text: '源码联调与热更新', link: '/guide/development' },
        { text: '主题', link: '/guide/theme' },
        { text: '组件总览', link: '/components/' },
      ] }],
    },
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
        prefix: ':not(:where(.vp-raw, .vp-raw *, [data-cp-overlay], [data-cp-overlay] *, [role="presentation"], [role="presentation"] *, [role="status"], [role="status"] *, [role="alert"], [role="alert"] *))',
      }),
    ] } },
    server: { watch: { ignored: ['**/.vitepress/dist/**'] } },
    plugins: [CodexProxyUI({ source: new URL('../../', import.meta.url) })],
  },
})
