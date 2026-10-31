<script setup lang="ts">
import { ZConfigProvider, ZScrollbar } from '@codex-proxy/ui'
import { zhHans } from '@codex-proxy/ui/locale'
import { applyTheme, createTheme } from '@codex-proxy/ui/theme'
import { inBrowser, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { watchEffect } from 'vue'
import { version } from '../../../package.json'

const { isDark } = useData()
watchEffect(() => {
  if (inBrowser)
    applyTheme(document.documentElement, createTheme({ scheme: isDark.value ? 'dark' : 'light' }))
})
</script>

<template>
  <ZConfigProvider :locale="zhHans">
    <DefaultTheme.Layout class="docs-site">
      <template #layout-bottom>
        <ZScrollbar target="document" class="docs-page-scrollbar" />
      </template>
      <template #nav-bar-title-after>
        <span class="docs-brand-copy">
          <span class="docs-brand-name">Codex Proxy</span>
          <span class="docs-brand-meta">
            <span>UI Library</span>
            <span class="docs-version" aria-label="组件库版本">v{{ version }}</span>
          </span>
        </span>
      </template>
    </DefaultTheme.Layout>
  </ZConfigProvider>
</template>
