<script setup lang="ts">
import { ZConfigProvider } from '@codex-proxy/ui'
import { zhHans } from '@codex-proxy/ui/locale'
import { applyResolvedTheme, DEFAULT_CUSTOM_THEME_COLOR, DEFAULT_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'
import { inBrowser, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watchEffect } from 'vue'

const { isDark } = useData()
watchEffect(() => {
  if (inBrowser)
    applyResolvedTheme(document.documentElement, resolveTheme(isDark.value ? 'dark' : 'light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR))
})
</script>

<template>
  <ZConfigProvider :locale="zhHans">
    <DefaultTheme.Layout />
  </ZConfigProvider>
</template>
