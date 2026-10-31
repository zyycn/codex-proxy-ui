import type {
  Theme,
  ThemeAppearanceSeed,
  ThemeColorId,
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeCustomization,
  ThemeMap,
  ThemeMode,
  ThemeOptions,
  ThemeScheme,
  ThemeSeedOverrides,
  ThemeSeedTokens,
  ThemeTokens,
} from '../types'
import { normalizeHexColor } from '../../shared/utils/color'
import { deriveCustomThemeAppearance } from '../derive/appearance'
import {
  deriveLightThemeFillMap,
  deriveThemeAliasMap,
  deriveThemeDataMap,
  deriveThemeLinkMap,
  deriveThemePresetColorMap,
  deriveThemePrimaryMap,
  deriveThemeSemanticMap,
  deriveThemeSurfaceMap,
  ensureThemeSurfaceContrast,
} from '../derive/colors'
import {
  deriveThemeComponentMap,
  deriveThemeDimensionMap,
  deriveThemeShadowMap,
} from '../derive/components'
import {
  DARK_CONTAINER_BASE,
  DARK_TEXT_BASE,
  DEFAULT_DIMENSIONS,
  DEFAULT_SEED_COLORS,
  defaultThemeColorId,
  defaultThemeCustomization,
  defaultThemePrimaryColor,
  LIGHT_CONTAINER_BASE,
  LIGHT_TEXT_BASE,
  themeColorPresets,
} from './constants'
import { normalizeThemeCustomization } from './normalize'
import { createThemeTokens } from './tokens'

export function resolveThemeScheme(mode: ThemeMode, prefersDark: boolean): ThemeScheme {
  if (mode === 'system')
    return prefersDark ? 'dark' : 'light'
  return mode
}

export function resolveThemeSeed(colorId: ThemeColorId, customColor: string): string {
  if (colorId === 'custom')
    return normalizeHexColor(customColor) ?? defaultThemePrimaryColor
  return themeColorPreset(colorId).seed
}

export function createTheme({
  scheme = 'light',
  colorId = defaultThemeColorId,
  primaryColor = defaultThemePrimaryColor,
  customization = defaultThemeCustomization,
}: ThemeOptions = {}): Theme {
  const seed = resolveThemeSeed(colorId, primaryColor)
  const normalizedCustomization = normalizeThemeCustomization(customization)
  const appearance = colorId === 'custom'
    ? deriveCustomThemeAppearance(scheme, seed)
    : themeColorPreset(colorId).appearance?.[scheme]
  const seedTokens = resolveThemeSeedTokens(
    scheme,
    seed,
    normalizedCustomization.seed,
    appearance,
  )
  const themeMap = deriveThemeMap(scheme, seed, seedTokens, normalizedCustomization)
  const tokensWithOverrides: ThemeTokens = {
    ...createThemeTokens(themeMap),
    ...normalizedCustomization.tokenOverrides,
  }

  return {
    scheme,
    colorId,
    seed,
    seedTokens,
    tokens: tokensWithOverrides,
  }
}

export function themeColorPreset(id: ThemeColorPresetId): ThemeColorPreset {
  return themeColorPresets.find(preset => preset.id === id) ?? themeColorPresets[0]!
}

function deriveThemeMap(
  name: ThemeScheme,
  seed: string,
  seedTokens: ThemeSeedTokens,
  customization: ThemeCustomization,
): ThemeMap {
  const fills = name === 'light' ? deriveLightThemeFillMap(seedTokens) : null
  const baseSurfaces = deriveThemeSurfaceMap(name, seedTokens)
  const primary = deriveThemePrimaryMap(seed, name, baseSurfaces.colorBgContainer)
  const surfaces = ensureThemeSurfaceContrast(baseSurfaces, fills, primary)
  const aliases = deriveThemeAliasMap(surfaces)
  const link = deriveThemeLinkMap(seedTokens.colorLink, name, surfaces.colorBgContainer)
  const semantics = deriveThemeSemanticMap(name, surfaces, seedTokens, fills, primary)

  return {
    surfaces,
    aliases,
    primary,
    link,
    semantics,
    presetColors: deriveThemePresetColorMap(name, surfaces.colorBgContainer, seedTokens),
    data: deriveThemeDataMap(aliases, semantics),
    shadows: deriveThemeShadowMap(name, seedTokens.shadowStrength),
    components: deriveThemeComponentMap(
      surfaces,
      fills,
      primary,
      semantics.error,
      seedTokens.shadowStrength,
    ),
    dimensions: deriveThemeDimensionMap(seedTokens, customization.component),
  }
}

export function resolveThemeSeedTokens(
  theme: ThemeScheme,
  colorPrimary: string,
  overrides?: ThemeSeedOverrides,
  appearance?: ThemeAppearanceSeed,
): ThemeSeedTokens {
  return {
    colorPrimary,
    colorSuccess: overrides?.colorSuccess ?? DEFAULT_SEED_COLORS.colorSuccess,
    colorWarning: overrides?.colorWarning ?? DEFAULT_SEED_COLORS.colorWarning,
    colorError: overrides?.colorError ?? DEFAULT_SEED_COLORS.colorError,
    colorInfo: overrides?.colorInfo ?? DEFAULT_SEED_COLORS.colorInfo,
    colorLink: overrides?.colorLink ?? colorPrimary,
    colorTextBase: overrides?.colorTextBase
      ?? appearance?.colorTextBase
      ?? (theme === 'dark' ? DARK_TEXT_BASE : LIGHT_TEXT_BASE),
    colorBgBase: overrides?.colorBgBase
      ?? appearance?.colorBgBase
      ?? (theme === 'dark' ? DARK_CONTAINER_BASE : LIGHT_CONTAINER_BASE),
    fontSize: overrides?.fontSize ?? DEFAULT_DIMENSIONS.fontSize,
    sizeUnit: overrides?.sizeUnit ?? DEFAULT_DIMENSIONS.sizeUnit,
    sizeStep: overrides?.sizeStep ?? DEFAULT_DIMENSIONS.sizeStep,
    controlHeight: overrides?.controlHeight ?? DEFAULT_DIMENSIONS.controlHeight,
    borderRadius: overrides?.borderRadius ?? DEFAULT_DIMENSIONS.borderRadius,
    shadowStrength: overrides?.shadowStrength ?? DEFAULT_DIMENSIONS.shadowStrength,
  }
}
