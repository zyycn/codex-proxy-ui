import type Empty from './Empty.vue'

export type EmptyProps = InstanceType<typeof Empty>['$props']
export type EmptyEmits = InstanceType<typeof Empty>['$emit']
export type EmptySlots = InstanceType<typeof Empty>['$slots']
export type EmptyInstance = InstanceType<typeof Empty>
