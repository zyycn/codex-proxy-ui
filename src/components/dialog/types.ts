import type Dialog from './Dialog.vue'

export type DialogProps = InstanceType<typeof Dialog>['$props']
export type DialogEmits = InstanceType<typeof Dialog>['$emit']
export type DialogSlots = InstanceType<typeof Dialog>['$slots']
export type DialogInstance = InstanceType<typeof Dialog>
