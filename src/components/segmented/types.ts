import type Segmented from './Segmented.vue'

export type SegmentedProps = InstanceType<typeof Segmented>['$props']
export type SegmentedEmits = InstanceType<typeof Segmented>['$emit']
export type SegmentedSlots = InstanceType<typeof Segmented>['$slots']
export type SegmentedInstance = InstanceType<typeof Segmented>
export type SegmentedOption = SegmentedProps['options'][number]
