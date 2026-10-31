// @env browser

import type { Theme } from '../types'
import { createThemeVars, themePrefix } from '../namespace'

const RUNTIME_THEME_STYLE_ID = `${themePrefix}-runtime-theme`

export function applyTheme(root: HTMLElement, theme: Theme): void {
  root.dataset.theme = theme.scheme
  root.dataset.themeColor = theme.colorId

  const style = ensureRuntimeThemeStyle(root.ownerDocument)
  style.dataset.theme = theme.scheme
  style.dataset.themeColor = theme.colorId
  style.textContent = serializeTheme(theme)
}

function ensureRuntimeThemeStyle(document: Document): HTMLStyleElement {
  const existing = document.getElementById(RUNTIME_THEME_STYLE_ID)
  if (existing?.tagName === 'STYLE')
    return existing as HTMLStyleElement

  existing?.remove()
  const style = document.createElement('style')
  style.id = RUNTIME_THEME_STYLE_ID
  style.setAttribute('data-z-runtime-theme', '')
  document.head.append(style)
  return style
}

function serializeTheme(theme: Theme): string {
  const declarations = Object.entries(createThemeVars(theme.tokens))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n')

  return `:root[data-theme='${theme.scheme}'][data-theme-color='${theme.colorId}'] {\n  color-scheme: ${theme.scheme};\n${declarations}\n}\n`
}
