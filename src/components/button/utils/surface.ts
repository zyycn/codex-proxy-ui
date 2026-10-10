import type { ButtonType, ButtonVariant } from '../types'

const semanticClasses: Record<Exclude<ButtonType, 'default'>, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-(--cp-button-primary-bg) text-(--cp-button-primary-color) shadow-cp-tertiary hover:bg-(--cp-button-primary-hover-bg) active:bg-(--cp-button-primary-active-bg)',
    plain: 'bg-cp-primary-container text-cp-primary-on-container shadow-none hover:bg-cp-primary-container-hover active:bg-cp-primary-container-hover',
    text: 'bg-transparent text-cp-primary-text shadow-none hover:bg-cp-primary-container-hover active:bg-cp-primary-container-hover',
    link: 'bg-transparent text-cp-primary-text shadow-none hover:underline active:text-cp-primary-active',
  },
  success: {
    solid: 'bg-cp-success text-cp-white shadow-cp-tertiary hover:bg-cp-success-hover active:bg-cp-success-active',
    plain: 'bg-cp-success-container text-cp-success-on-container shadow-none hover:bg-cp-success-container-hover active:bg-cp-success-container-active',
    text: 'bg-transparent text-cp-success-text shadow-none hover:bg-cp-success-container-hover active:bg-cp-success-container-active',
    link: 'bg-transparent text-cp-success-text shadow-none hover:underline',
  },
  info: {
    solid: 'bg-cp-info text-cp-white shadow-cp-tertiary hover:bg-cp-info-hover active:bg-cp-info-active',
    plain: 'bg-cp-info-container text-cp-info-on-container shadow-none hover:bg-cp-info-container-hover active:bg-cp-info-container-active',
    text: 'bg-transparent text-cp-info-text shadow-none hover:bg-cp-info-container-hover active:bg-cp-info-container-active',
    link: 'bg-transparent text-cp-info-text shadow-none hover:underline',
  },
  warning: {
    solid: 'bg-cp-warning text-cp-white shadow-cp-tertiary hover:bg-cp-warning-hover active:bg-cp-warning-active',
    plain: 'bg-cp-warning-container text-cp-warning-on-container shadow-none hover:bg-cp-warning-container-hover active:bg-cp-warning-container-active',
    text: 'bg-transparent text-cp-warning-text shadow-none hover:bg-cp-warning-container-hover active:bg-cp-warning-container-active',
    link: 'bg-transparent text-cp-warning-text shadow-none hover:underline',
  },
  danger: {
    solid: 'bg-cp-error text-cp-white shadow-cp-tertiary hover:bg-cp-error-hover active:bg-cp-error-active',
    plain: 'bg-cp-error-container text-cp-error-on-container shadow-none hover:bg-cp-error-container-hover active:bg-cp-error-container-active',
    text: 'bg-transparent text-cp-error-text shadow-none hover:bg-cp-error-container-hover hover:text-cp-error-on-container active:bg-cp-error-container-active active:text-cp-error-on-container',
    link: 'bg-transparent text-cp-error-text shadow-none hover:underline',
  },
}

export function buttonSurface(type: ButtonType, variant: ButtonVariant, icon = false) {
  if (type !== 'default')
    return semanticClasses[type][variant]
  if (variant === 'solid') {
    return icon
      ? 'bg-cp-icon-button-secondary-bg text-cp-text-secondary shadow-cp-tertiary hover:bg-cp-icon-button-secondary-hover-bg hover:text-cp-text active:bg-cp-icon-button-secondary-active-bg'
      : 'bg-cp-button-secondary-bg text-cp-text shadow-cp-tertiary hover:bg-cp-button-secondary-hover-bg active:bg-cp-button-secondary-active-bg'
  }
  if (variant === 'plain')
    return 'bg-cp-fill-tertiary text-cp-text-secondary shadow-none hover:bg-cp-bg-text-hover hover:text-cp-text active:bg-cp-fill-secondary aria-pressed:bg-cp-bg-text-active'
  if (variant === 'link')
    return 'bg-transparent text-cp-text-secondary shadow-none hover:text-cp-text hover:underline'
  return 'bg-transparent text-cp-text-secondary shadow-none hover:bg-cp-fill-quaternary hover:text-cp-text active:bg-cp-fill-tertiary'
}
