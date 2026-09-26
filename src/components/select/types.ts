export interface SelectOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectValue<M extends boolean> = M extends true ? string[] : string

export interface SelectProps<Multiple extends boolean> {
  options: SelectOption[]
  size?: SelectSize
  disabled?: boolean
  placeholder?: string
  emptyText?: string
  multiple?: Multiple & boolean
  filterable?: boolean
  collapseTags?: boolean
  collapseTagsTooltip?: boolean
  maxCollapseTags?: number
  loading?: boolean
}
