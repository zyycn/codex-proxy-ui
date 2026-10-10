import type { ComponentSize } from '../../shared/types'

import type Button from './Button.vue'

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type ButtonVariant = 'solid' | 'plain' | 'text' | 'link'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  variant?: ButtonVariant
  size?: ComponentSize
  loading?: boolean
  disabled?: boolean
  nativeType?: ButtonNativeType
}
export type ButtonEmits = InstanceType<typeof Button>['$emit']
export type ButtonSlots = InstanceType<typeof Button>['$slots']
export type ButtonInstance = InstanceType<typeof Button>
