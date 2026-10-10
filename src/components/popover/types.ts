import type Popover from './Popover.vue'

export type PopoverPlacement
  = 'top' | 'top-start' | 'top-end' | 'right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left'
export type PopoverTrigger = 'click' | 'hover' | 'hover-click'
export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverArrowSurfaceClass = string | Partial<Record<PopoverSide, string>>

export type PopoverProps = InstanceType<typeof Popover>['$props']
export type PopoverEmits = InstanceType<typeof Popover>['$emit']
export type PopoverSlots = InstanceType<typeof Popover>['$slots']
export type PopoverInstance = InstanceType<typeof Popover>
