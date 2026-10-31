declare const __CODEX_PROXY_UI_THEME_PREFIX__: string

export const defaultThemePrefix = 'z'

/** 构建配置只影响 CSS 命名空间，不参与 Token 身份与组件导出命名 */
export const themePrefix = typeof __CODEX_PROXY_UI_THEME_PREFIX__ === 'undefined'
  ? defaultThemePrefix
  : __CODEX_PROXY_UI_THEME_PREFIX__

export function getThemeVarName(name: string): `--${string}` {
  return `--${themePrefix}-${name}`
}

export function createThemeVars(tokens: Readonly<Record<string, string>>): Record<`--${string}`, string> {
  return Object.fromEntries(Object.entries(tokens).map(([name, value]) => [getThemeVarName(name), value]))
}
