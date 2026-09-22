# 主题

组件通过 CSS Variables 使用主题，不依赖应用的状态管理、路由或 API

## 独立应用

```ts
import { applyResolvedTheme, DEFAULT_CUSTOM_THEME_COLOR, DEFAULT_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'

applyResolvedTheme(
  document.documentElement,
  resolveTheme('light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR),
)
```

浏览器适配函数只在客户端调用，SSR 中应放在 `onMounted` 或客户端生命周期内

## 局部主题

向容器元素调用 `applyResolvedTheme`，即可设置局部配色与密度。浮层挂载到其他节点时，需要确保该节点也处于同一个主题作用域。

## 深色与浅色

点击文档顶部的主题开关，即可检查所有示例的明暗状态
