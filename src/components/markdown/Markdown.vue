<script setup lang="ts">
import { computed, onMounted, shallowRef, useTemplateRef } from 'vue'
import { getThemeVarName } from '../../theme/namespace'
import markdownStyles from './styles/markdown.css?inline'
import { renderMarkdown } from './utils/markdown'

const props = defineProps<{
  source?: string | null
}>()

const host = useTemplateRef<HTMLElement>('host')
const contentRoot = shallowRef<HTMLElement | null>(null)
const html = computed(() => renderMarkdown(props.source))

onMounted(() => {
  if (!host.value)
    return

  const shadowRoot = host.value.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  const content = document.createElement('div')
  // 内联样式打包为 JS 字符串后不会再经过消费方的 CSS 转换，按当前命名空间绑定变量。
  style.textContent = markdownStyles.replace(/--z-([a-z0-9-]+)/gu, (_, token: string) => getThemeVarName(token))
  shadowRoot.append(style, content)
  contentRoot.value = content
})
</script>

<template>
  <div ref="host" class="min-w-0">
    <Teleport v-if="contentRoot" :to="contentRoot">
      <div class="markdown-body" v-html="html" />
    </Teleport>
  </div>
</template>
