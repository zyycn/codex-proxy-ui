export type PopoverPlacement
  = 'top' | 'top-start' | 'top-end' | 'right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left'
export type PopoverTrigger = 'click' | 'hover' | 'hover-click'
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverArrowSurfaceClass = string | Partial<Record<PopoverSide, string>>
