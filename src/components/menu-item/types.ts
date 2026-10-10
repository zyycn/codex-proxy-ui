import type MenuItem from './MenuItem.vue'

export type MenuItemProps = InstanceType<typeof MenuItem>['$props']
export type MenuItemEmits = InstanceType<typeof MenuItem>['$emit']
export type MenuItemSlots = InstanceType<typeof MenuItem>['$slots']
export type MenuItemInstance = InstanceType<typeof MenuItem>
