import type Input from './Input.vue'

export type InputProps = InstanceType<typeof Input>['$props']
export type InputEmits = InstanceType<typeof Input>['$emit']
export type InputSlots = InstanceType<typeof Input>['$slots']
export type InputInstance = InstanceType<typeof Input>
