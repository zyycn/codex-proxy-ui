import type {
  ThemeColorPreset,
  ThemeColorPresetId,
  ThemeCustomization,
  ThemeMode,
  ThemePresetColorName,
  ThemeTokenName,
} from '../types'
import { presetPrimaryColors } from '@ant-design/colors'
import en from '../../locale/lang/en'

export const defaultThemeMode: ThemeMode = 'system'
export const defaultThemeColorId: ThemeColorPresetId = 'relay-blue'
export const defaultThemePrimaryColor = '#5983F4'
export const defaultThemeCustomization: ThemeCustomization = {}

export const DEFAULT_SEED_COLORS = {
  colorSuccess: '#12B981',
  colorWarning: '#F59E0B',
  colorError: '#EF4444',
  colorInfo: defaultThemePrimaryColor,
} as const

export const PRESET_COLOR_SEEDS = {
  blue: presetPrimaryColors.blue,
  cyan: presetPrimaryColors.cyan,
  green: presetPrimaryColors.green,
  orange: presetPrimaryColors.orange,
  purple: presetPrimaryColors.purple,
  red: presetPrimaryColors.red,
} as const satisfies Record<ThemePresetColorName, string>

export const DEFAULT_DIMENSIONS = {
  fontSize: 13,
  sizeUnit: 4,
  sizeStep: 4,
  controlHeight: 38,
  tableRowHeight: 60,
  borderRadius: 8,
  cardBorderRadius: 18,
  shadowStrength: 100,
} as const

export const themeColorPresets: readonly ThemeColorPreset[] = [
  {
    id: 'relay-blue',
    ...en.theme['relay-blue'],
    seed: defaultThemePrimaryColor,
  },
  {
    id: 'deep-teal',
    ...en.theme['deep-teal'],
    seed: '#0E7C72',
    appearance: {
      light: {
        colorBgBase: '#FBFEFD',
        colorTextBase: '#122C2A',
      },
      dark: {
        colorBgBase: '#102321',
        colorTextBase: '#D7EAE6',
      },
    },
  },
  {
    id: 'signal-violet',
    ...en.theme['signal-violet'],
    seed: '#A0583D',
    appearance: {
      light: {
        colorBgBase: '#F9F3E8',
        colorTextBase: '#2B211B',
      },
      dark: {
        colorBgBase: '#1E1713',
        colorTextBase: '#EEE3D3',
      },
    },
  },
  {
    id: 'graphite',
    ...en.theme.graphite,
    seed: '#525B66',
    appearance: {
      light: {
        colorBgBase: '#FAF9F6',
        colorTextBase: '#25272B',
      },
      dark: {
        colorBgBase: '#1B1C1E',
        colorTextBase: '#E5E1D9',
      },
    },
  },
] as const

export const BLACK = '#000000'
export const WHITE = '#FFFFFF'
export const LIGHT_FOREGROUND = WHITE
export const LIGHT_CONTAINER_BASE = WHITE
export const LIGHT_TEXT_BASE = '#0E1726'
export const DARK_CONTAINER_BASE = '#111A29'
export const DARK_TEXT_BASE = '#D8E2EE'

/** 中继蓝浅色主题的稳定中性色阶；带色温主题会连续过渡到通用派生结果。 */
export const LIGHT_SURFACE_ANCHORS = {
  colorBgSpotlight: '#111827',
  colorFillSecondary: '#E9EEF5',
  colorFillTertiary: '#F1F5F9',
  colorFillQuaternary: '#F6F8FB',
  colorBorder: '#D8E0EA',
  colorBorderSecondary: '#E2E8F0',
  colorTextHeading: '#111827',
  colorTextSecondary: '#64748B',
  colorTextMuted: '#94A3B8',
} as const

/** 中继蓝暗色主题的视觉锚点；带色温主题会连续过渡到通用派生结果。 */
export const DARK_SURFACE_ANCHORS = {
  colorBgLayout: '#0B111C',
  colorBgMask: '#030712',
  colorBgSpotlight: '#050913',
} as const

/** 浅色阴影保持中性，不随主题文字色染色。 */
export const LIGHT_SHADOW_BASE = LIGHT_TEXT_BASE

export const EDITABLE_COLOR_TOKEN_NAMES = new Set<ThemeTokenName>([
  'menu-item-selected-bg',
  'input-bg',
  'input-hover-bg',
  'input-active-bg',
  'button-primary-color',
  'button-primary-bg',
  'button-primary-hover-bg',
  'button-primary-active-bg',
  'button-secondary-bg',
  'button-secondary-hover-bg',
  'button-secondary-active-bg',
  'icon-button-secondary-bg',
  'icon-button-secondary-hover-bg',
  'icon-button-secondary-active-bg',
  'card-bg',
  'modal-bg',
  'popover-header-bg',
  'table-header-bg',
  'table-row-bg',
  'table-row-stripe-bg',
  'table-row-hover-bg',
  'table-row-selected-bg',
  'table-row-selected-hover-bg',
  'progress-remaining-color',
  'layout-sider-bg',
  'scrollbar-thumb-bg',
  'scrollbar-thumb-hover-bg',
])

export const EDITABLE_SHADOW_TOKEN_NAMES = new Set<ThemeTokenName>([
  'input-shadow',
  'input-hover-shadow',
  'input-active-shadow',
  'card-shadow',
  'layout-sider-shadow',
])

/** 只有控件填充允许透出宿主背景；容器与固定表格单元格保持实色。 */
export const ALPHA_COLOR_TOKEN_NAMES = new Set<string>([
  'input-bg',
  'input-hover-bg',
  'input-active-bg',
  'button-secondary-bg',
  'button-secondary-hover-bg',
  'button-secondary-active-bg',
  'icon-button-secondary-bg',
  'icon-button-secondary-hover-bg',
  'icon-button-secondary-active-bg',
] satisfies ThemeTokenName[])
