# v0.3.2

## 问题修复

- 修复弹窗关闭时的重复退场，内容在退出动画结束后自动卸载，退场中重新打开会取消本次卸载
- 修复连续打开弹窗时的焦点恢复，关闭中的弹窗不会抢走新弹窗焦点；滚动锁在退场结束后释放
- `BaseModal` 与 `BaseConfirmModal` 提供 `afterLeave` 事件，供调用方在动画结束后清除明文凭据或执行必要收尾，普通弹窗无需额外清空业务数据

## 安装

```bash
pnpm add https://github.com/zyycn/codex-proxy-ui/releases/download/v0.3.2/codex-proxy-ui-0.3.2.tgz
```

需要 Node.js 24+、Vue 3.5+，包名为 `@codex-proxy/ui`
