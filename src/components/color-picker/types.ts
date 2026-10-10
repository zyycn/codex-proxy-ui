import type ColorPicker from './ColorPicker.vue'

export type ColorPickerProps = InstanceType<typeof ColorPicker>['$props']
export type ColorPickerEmits = InstanceType<typeof ColorPicker>['$emit']
export type ColorPickerSlots = InstanceType<typeof ColorPicker>['$slots']
export type ColorPickerInstance = InstanceType<typeof ColorPicker>
