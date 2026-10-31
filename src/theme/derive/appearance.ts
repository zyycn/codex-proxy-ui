import type {
  ThemeAppearanceSeed,
  ThemeScheme,
} from '../types'
import { normalizeHexColor } from '../../shared/utils/color'
import { generateColorPalette, mix } from '../core/color'
import {
  DARK_CONTAINER_BASE,
  DARK_TEXT_BASE,
  defaultThemePrimaryColor,
  LIGHT_CONTAINER_BASE,
  LIGHT_TEXT_BASE,
} from '../core/constants'

const CUSTOM_APPEARANCE_DERIVERS = {
  light: deriveLightCustomAppearance,
  dark: deriveDarkCustomAppearance,
} satisfies Record<ThemeScheme, (colorPrimary: string) => ThemeAppearanceSeed>

/** 自定义主色仅向中性界面注入少量色温，再交给统一 Surface Map 派生。 */
export function deriveCustomThemeAppearance(
  theme: ThemeScheme,
  colorPrimary: string,
): ThemeAppearanceSeed {
  const normalized = normalizeHexColor(colorPrimary) ?? defaultThemePrimaryColor
  return CUSTOM_APPEARANCE_DERIVERS[theme](normalized)
}

function deriveDarkCustomAppearance(colorPrimary: string): ThemeAppearanceSeed {
  const [paletteBackground = DARK_CONTAINER_BASE] = generateColorPalette(
    colorPrimary,
    'dark',
  )

  return {
    colorBgBase: mix(DARK_CONTAINER_BASE, paletteBackground, 0.3),
    colorTextBase: DARK_TEXT_BASE,
  }
}

function deriveLightCustomAppearance(colorPrimary: string): ThemeAppearanceSeed {
  return {
    colorBgBase: mix(LIGHT_CONTAINER_BASE, colorPrimary, 0.028),
    colorTextBase: LIGHT_TEXT_BASE,
  }
}
