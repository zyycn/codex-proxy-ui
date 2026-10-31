import type { ButtonType, ButtonVariant } from '../types'

const semanticClasses: Record<Exclude<ButtonType, 'default'>, Record<ButtonVariant, string>> = {
  primary: {
    solid: 'bg-(--z-button-primary-bg) text-(--z-button-primary-color) shadow-z-tertiary hover:bg-(--z-button-primary-hover-bg) active:bg-(--z-button-primary-active-bg)',
    plain: 'bg-z-primary-container text-z-primary-on-container shadow-none hover:bg-z-primary-container-hover active:bg-z-primary-container-hover',
    text: 'bg-transparent text-z-primary-text shadow-none hover:bg-z-primary-container-hover active:bg-z-primary-container-hover',
    link: 'bg-transparent text-z-primary-text shadow-none hover:underline active:text-z-primary-active',
  },
  success: {
    solid: 'bg-z-success text-z-white shadow-z-tertiary hover:bg-z-success-hover active:bg-z-success-active',
    plain: 'bg-z-success-container text-z-success-on-container shadow-none hover:bg-z-success-container-hover active:bg-z-success-container-active',
    text: 'bg-transparent text-z-success-text shadow-none hover:bg-z-success-container-hover active:bg-z-success-container-active',
    link: 'bg-transparent text-z-success-text shadow-none hover:underline',
  },
  info: {
    solid: 'bg-z-info text-z-white shadow-z-tertiary hover:bg-z-info-hover active:bg-z-info-active',
    plain: 'bg-z-info-container text-z-info-on-container shadow-none hover:bg-z-info-container-hover active:bg-z-info-container-active',
    text: 'bg-transparent text-z-info-text shadow-none hover:bg-z-info-container-hover active:bg-z-info-container-active',
    link: 'bg-transparent text-z-info-text shadow-none hover:underline',
  },
  warning: {
    solid: 'bg-z-warning text-z-white shadow-z-tertiary hover:bg-z-warning-hover active:bg-z-warning-active',
    plain: 'bg-z-warning-container text-z-warning-on-container shadow-none hover:bg-z-warning-container-hover active:bg-z-warning-container-active',
    text: 'bg-transparent text-z-warning-text shadow-none hover:bg-z-warning-container-hover active:bg-z-warning-container-active',
    link: 'bg-transparent text-z-warning-text shadow-none hover:underline',
  },
  danger: {
    solid: 'bg-z-error text-z-white shadow-z-tertiary hover:bg-z-error-hover active:bg-z-error-active',
    plain: 'bg-z-error-container text-z-error-on-container shadow-none hover:bg-z-error-container-hover active:bg-z-error-container-active',
    text: 'bg-transparent text-z-error-text shadow-none hover:bg-z-error-container-hover hover:text-z-error-on-container active:bg-z-error-container-active active:text-z-error-on-container',
    link: 'bg-transparent text-z-error-text shadow-none hover:underline',
  },
}

export function buttonSurface(type: ButtonType, variant: ButtonVariant, icon = false) {
  if (type !== 'default')
    return semanticClasses[type][variant]
  if (variant === 'solid') {
    return icon
      ? 'bg-z-icon-button-secondary-bg text-z-text-secondary shadow-z-tertiary hover:bg-z-icon-button-secondary-hover-bg hover:text-z-text active:bg-z-icon-button-secondary-active-bg'
      : 'bg-z-button-secondary-bg text-z-text shadow-z-tertiary hover:bg-z-button-secondary-hover-bg active:bg-z-button-secondary-active-bg'
  }
  if (variant === 'plain')
    return 'bg-z-fill-tertiary text-z-text-secondary shadow-none hover:bg-z-bg-text-hover hover:text-z-text active:bg-z-fill-secondary aria-pressed:bg-z-bg-text-active'
  if (variant === 'link')
    return 'bg-transparent text-z-text-secondary shadow-none hover:text-z-text hover:underline'
  return 'bg-transparent text-z-text-secondary shadow-none hover:bg-z-fill-quaternary hover:text-z-text active:bg-z-fill-tertiary'
}
