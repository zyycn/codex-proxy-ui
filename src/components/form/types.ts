import type Form from './Form.vue'
import type FormItem from './FormItem.vue'

export type FormValidationTrigger = 'change' | 'blur'

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: FormValidationTrigger | FormValidationTrigger[]
  validator?: (value: unknown, model: object) => void | string | Promise<void | string>
}

export type FormRules = Record<string, FormRule | FormRule[]>

export interface FormInstance {
  validate: () => Promise<boolean>
  validateField: (props: string | string[]) => Promise<boolean>
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
  focusField: (prop: string) => void
}
export type FormProps = InstanceType<typeof Form>['$props']
export type FormSlots = InstanceType<typeof Form>['$slots']
export type FormItemProps = InstanceType<typeof FormItem>['$props']
export type FormItemSlots = InstanceType<typeof FormItem>['$slots']
export type FormItemInstance = InstanceType<typeof FormItem>
