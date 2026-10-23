# v0.6.0

## 新增

- 新增 `ZConfigProvider` 与 `@codex-proxy/ui/locale`，提供英文、简体中文和繁体中文语言包，支持响应式切换与嵌套配置
- 新增 `createNotification`，可绑定应用的响应式语言；已打开通知的默认标题和关闭标签随语言更新

## 调整与修复

- 日期选择器、分页、表格、表单、选择框和弹窗等组件使用统一语言配置，显式文案与插槽仍可覆盖默认内容
- 调整表格间距、弹窗标题与关闭按钮、卡片操作区和日期选择面板；分段控件支持长标签及窄容器横向滚动
- 更新锁定的 DOMPurify 至 3.4.17
- 修复干净检出时 Playground 语言包导入依赖预构建类型声明的问题

## 升级提示

- 组件默认语言改为英文；中文应用需通过 `ZConfigProvider` 配置 `zhHans` 或 `zhHant`
- `DatePicker.locale` 从 Day.js 语言字符串改为 `UiLocale` 语言包，未指定时继承 Provider 配置
- 命令式通知需使用 `createNotification({ locale })` 绑定语言；直接使用 `ZNotification` 默认显示英文
- `v-loading` 默认提示改为英文，应用可通过 `text` 选项提供本地化文本；主题预设的中文名称与说明可从语言包的 `theme` 字段读取

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.6.0/codex-proxy-ui-0.6.0.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
