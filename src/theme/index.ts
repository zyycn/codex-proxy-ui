import type { ThemeTokenName } from './types'
import {
  DEFAULT_CUSTOM_THEME_COLOR,
  DEFAULT_THEME_COLOR,
} from './core/constants'
import { resolveTheme } from './core/resolve'

/** 所有运行时主题变量，由主题编译器的实际输出生成，供隔离页面安全转发。 */
export const THEME_TOKEN_NAMES = Object.freeze(
  Object.keys(
    resolveTheme('light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR).tokens,
  ) as ThemeTokenName[],
)

export {
  DEFAULT_CUSTOM_THEME_COLOR,
  DEFAULT_THEME_COLOR,
  DEFAULT_THEME_CUSTOMIZATION,
  DEFAULT_THEME_MODE,
  THEME_COLOR_PRESETS,
} from './core/constants'
export {
  isThemeColorId,
  isThemeMode,
  normalizeThemeCustomization,
  themeTokenAllowsAlpha,
} from './core/normalize'
export {
  resolveTheme,
  resolveThemeName,
  resolveThemeSeed,
  themeColorPreset,
} from './core/resolve'
export { applyResolvedTheme } from './runtime/browser'
export type {
  ResolvedTheme,
  ResolvedThemeSeedTokens,
  ThemeAppearanceSeed,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeComponentOverrides,
  ThemeCustomization,
  ThemeMode,
  ThemeName,
  ThemeSeedOverrides,
  ThemeTokenName,
  ThemeTokens,
} from './types'
