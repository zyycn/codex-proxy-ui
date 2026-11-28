# v0.13.4

## 交互改进

- 日期时间选择器支持滚动或键盘选择时、分、秒，范围为空时分别提示开始时间和结束时间
- 日期范围的快捷选项与日历标题垂直对齐，选区底色贴合首尾日期，确认后焦点回到输入框
- 表格文本截断时可悬停查看全文，下拉选项的长描述和表单的长错误提示可换行阅读
- 单行与多行输入框默认关闭自动填充，可通过 `autocomplete` 指定用户名、密码等用途

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.13.4/codex-proxy-ui-0.13.4.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
