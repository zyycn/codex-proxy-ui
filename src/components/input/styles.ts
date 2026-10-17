import type { ComponentSize } from '../../shared/types'

const sizeClasses: Record<ComponentSize, string> = {
  small: 'h-cp-control-sm gap-2 px-3 text-xs',
  default: 'h-cp-control gap-2.5 px-3.5 text-cp',
  large: 'h-cp-control-lg gap-3 px-4 text-cp-lg',
}

export function getInputClasses(size: ComponentSize, disabled: boolean, invalid: boolean) {
  return [
    'group/input relative inline-flex w-full min-w-0 items-center overflow-visible rounded-cp border-0 text-cp-text shadow-cp-input transition-[background-color,box-shadow,color] duration-160 motion-reduce:transition-none',
    sizeClasses[size],
    disabled
      ? 'cursor-not-allowed bg-cp-bg-container-disabled text-cp-text-disabled shadow-none'
      : invalid
        ? 'bg-cp-error-container hover:not-focus-within:bg-(--cp-input-error-active-bg) hover:not-focus-within:shadow-cp-input-error-active focus-within:bg-(--cp-input-error-active-bg) focus-within:shadow-cp-input-error-active'
        : [
            'bg-(--cp-input-bg)',
            'hover:not-focus-within:bg-(--cp-input-hover-bg) hover:not-focus-within:shadow-cp-input-hover',
            'focus-within:bg-(--cp-input-active-bg) focus-within:shadow-cp-input-active',
          ],
  ]
}

export const inputFieldClass = 'h-full min-w-0 flex-1 border-0 bg-transparent font-emphasis leading-[1.15] text-cp-text outline-0 placeholder:font-normal placeholder:text-cp-text-quaternary disabled:cursor-not-allowed disabled:text-cp-text-disabled [&[type=number]]:appearance-[textfield] [&[type=number]::-webkit-inner-spin-button]:m-0 [&[type=number]::-webkit-inner-spin-button]:appearance-none [&[type=number]::-webkit-outer-spin-button]:m-0 [&[type=number]::-webkit-outer-spin-button]:appearance-none'
