import type { ThemeTokenName } from './types'
import { createTheme } from './core/resolve'

/** 由主题编译器实际输出生成的语义 Token 名，独立于各页面的 CSS 前缀 */
export const themeTokenNames = Object.freeze(
  Object.keys(
    createTheme().tokens,
  ) as ThemeTokenName[],
)

export {
  defaultThemeColorId,
  defaultThemeMode,
  defaultThemePrimaryColor,
  themeColorPresets,
} from './core/constants'
export {
  isThemeColorId,
  isThemeMode,
  normalizeThemeCustomization,
  supportsThemeTokenAlpha,
} from './core/normalize'
export {
  createTheme,
  resolveThemeScheme,
} from './core/resolve'
export { createThemeVars, getThemeVarName, themePrefix } from './namespace'
export { applyTheme } from './runtime/browser'
export type {
  Theme,
  ThemeAppearanceSeed,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeComponentOverrides,
  ThemeCustomization,
  ThemeMode,
  ThemeOptions,
  ThemeScheme,
  ThemeSeedOverrides,
  ThemeSeedTokens,
  ThemeTokenName,
  ThemeTokens,
} from './types'
