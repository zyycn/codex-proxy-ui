import type Card from './Card.vue'

export type CardProps = InstanceType<typeof Card>['$props']
export type CardEmits = InstanceType<typeof Card>['$emit']
export type CardSlots = InstanceType<typeof Card>['$slots']
export type CardInstance = InstanceType<typeof Card>
