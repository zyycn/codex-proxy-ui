import type { ComputedRef, InjectionKey } from 'vue'
import type { FormInstance, FormRules, FormValidationTrigger } from './types'

export interface FormFieldInstance {
  prop: ComputedRef<string | undefined>
  validate: (trigger?: FormValidationTrigger) => Promise<boolean>
  clearValidate: () => void
  focus: () => void
  scrollIntoView: () => void
}

interface FormContext extends FormInstance {
  model: ComputedRef<object>
  rules: ComputedRef<FormRules>
  register: (field: FormFieldInstance) => () => void
}

interface FormFieldContext {
  controlId: ComputedRef<string>
  labelledBy: ComputedRef<string | undefined>
  describedBy: ComputedRef<string | undefined>
  invalid: ComputedRef<boolean>
  required: ComputedRef<boolean>
  validate: FormFieldInstance['validate']
  setControlId: (id: string | undefined) => void
}

export const formFieldKey: InjectionKey<FormFieldContext | null> = Symbol('form-field')
export const formKey: InjectionKey<FormContext> = Symbol('form')
