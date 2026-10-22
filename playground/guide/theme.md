# 主题

组件通过 CSS Variables 使用主题，不依赖应用的状态管理、路由或 API

## 独立应用

```ts
import { applyResolvedTheme, DEFAULT_CUSTOM_THEME_COLOR, DEFAULT_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'
import '@codex-proxy/ui/styles.css'

applyResolvedTheme(
  document.documentElement,
  resolveTheme('light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR),
)
```

`resolveTheme` 是纯派生函数，返回主题标识、Seed 与完整 CSS Token。`applyResolvedTheme` 把 Token 写入文档级样式表，并在文档根元素设置主题标识；它用于 `document.documentElement`，不用于局部容器

浏览器适配函数只在客户端调用，SSR 中应放在 `onMounted` 或客户端生命周期内。模式监听、配置保存与切换动画由应用负责

## 配色与密度

`resolveTheme` 的第二个参数选择预置配色，使用 `'custom'` 时从第三个参数读取主色 HEX。第四个参数调整 Seed、组件尺寸或允许覆盖的 Token

```ts
import { resolveTheme } from '@codex-proxy/ui/theme'

const theme = resolveTheme('light', 'custom', '#0E7C72', {
  seed: { fontSize: 14, controlHeight: 40, borderRadius: 10 },
  component: { tableRowHeight: 64, cardBorderRadius: 20 },
})
```

输入经统一规范化：无效的 Seed 颜色覆盖被忽略，自定义主色无效时回退默认色，尺寸限制在允许范围内；`tokenOverrides` 只接受开放的组件字段，不能覆盖任意 CSS 变量。优先调整 Seed 以保留状态之间的派生关系

## 局部主题

局部主题将派生的 Token 绑定到容器，不改写文档级主题

```vue
<script setup lang="ts">
import { ZButton } from '@codex-proxy/ui'
import { DEFAULT_CUSTOM_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'

const theme = resolveTheme('dark', 'deep-teal', DEFAULT_CUSTOM_THEME_COLOR)
</script>

<template>
  <section :data-theme="theme.name" :data-theme-color="theme.colorId" :style="theme.tokens">
    <ZButton type="primary">
      局部主题按钮
    </ZButton>
  </section>
</template>
```

浮层挂到 `body` 后继承全局主题。需要局部配色时，Popover 与 DatePicker 可设置 `:teleported="false"`；Dialog 等挂到 `body` 且不支持局部挂载的浮层使用全局主题

## 深色与浅色

`resolveTheme` 接受 `'light'` 或 `'dark'`。跟随系统时先用 `resolveThemeName('system', prefersDark)` 解析模式，`prefersDark` 由应用读取系统偏好

文档顶部的主题开关可用于检查所有示例的明暗状态
