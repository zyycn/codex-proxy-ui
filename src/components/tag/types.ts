import type Tag from './Tag.vue'

export type TagProps = InstanceType<typeof Tag>['$props']
export type TagEmits = InstanceType<typeof Tag>['$emit']
export type TagSlots = InstanceType<typeof Tag>['$slots']
export type TagInstance = InstanceType<typeof Tag>
