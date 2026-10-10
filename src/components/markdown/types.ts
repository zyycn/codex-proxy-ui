import type Markdown from './Markdown.vue'

export type MarkdownProps = InstanceType<typeof Markdown>['$props']
export type MarkdownEmits = InstanceType<typeof Markdown>['$emit']
export type MarkdownSlots = InstanceType<typeof Markdown>['$slots']
export type MarkdownInstance = InstanceType<typeof Markdown>
