import type { ComponentSize } from '../../shared/types'

const sizeClasses: Record<ComponentSize, string> = {
  small: 'h-z-control-sm gap-2 px-3 text-xs',
  default: 'h-z-control gap-2.5 px-3.5 text-z',
  large: 'h-z-control-lg gap-3 px-4 text-z-lg',
}

export function getInputClasses(size: ComponentSize, disabled: boolean, invalid: boolean) {
  return [
    'group/input relative inline-flex w-full min-w-0 items-center overflow-visible rounded-z border-0 text-z-text shadow-z-input transition-[background-color,box-shadow,color] duration-160 motion-reduce:transition-none',
    sizeClasses[size],
    disabled
      ? 'cursor-not-allowed bg-z-bg-container-disabled text-z-text-disabled shadow-none'
      : invalid
        ? 'bg-z-error-container hover:not-focus-within:bg-(--z-input-error-active-bg) hover:not-focus-within:shadow-z-input-error-active focus-within:bg-(--z-input-error-active-bg) focus-within:shadow-z-input-error-active'
        : [
            'bg-(--z-input-bg)',
            'hover:not-focus-within:bg-(--z-input-hover-bg) hover:not-focus-within:shadow-z-input-hover',
            'focus-within:bg-(--z-input-active-bg) focus-within:shadow-z-input-active',
          ],
  ]
}

export const inputFieldClass = 'h-full min-w-0 flex-1 border-0 bg-transparent font-emphasis leading-[1.15] text-z-text outline-0 placeholder:font-normal placeholder:text-z-text-quaternary disabled:cursor-not-allowed disabled:text-z-text-disabled [&[type=number]]:appearance-[textfield] [&[type=number]::-webkit-inner-spin-button]:m-0 [&[type=number]::-webkit-inner-spin-button]:appearance-none [&[type=number]::-webkit-outer-spin-button]:m-0 [&[type=number]::-webkit-outer-spin-button]:appearance-none'
