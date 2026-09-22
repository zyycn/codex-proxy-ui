<script setup lang="ts">
import { BaseButton, BasePageHeader, BaseSwitch } from '@codex-proxy/ui'
import { applyResolvedTheme, DEFAULT_CUSTOM_THEME_COLOR, DEFAULT_THEME_COLOR, resolveTheme } from '@codex-proxy/ui/theme'
import { shallowRef, watch } from 'vue'
import ControlsPreview from './components/ControlsPreview.vue'

const dark = shallowRef(false)
watch(dark, value => applyResolvedTheme(document.documentElement, resolveTheme(value ? 'dark' : 'light', DEFAULT_THEME_COLOR, DEFAULT_CUSTOM_THEME_COLOR)), { immediate: true })
</script>

<template>
  <main class="mx-auto max-w-5xl p-5 sm:p-8">
    <BasePageHeader title="组件预览" description="Codex Proxy UI · 组件、交互与主题">
      <template #actions>
        <div class="flex items-center gap-2 text-cp-sm">
          <BaseSwitch v-model="dark" label="深色主题" />
          深色主题
        </div>
      </template>
    </BasePageHeader>
    <section aria-label="按钮" class="mt-6 rounded-cp-card bg-cp-bg-container p-5">
      <h2 class="mb-4 mt-0 text-cp-lg font-emphasis">
        操作
      </h2>
      <div class="flex flex-wrap gap-3">
        <BaseButton variant="primary">
          主要操作
        </BaseButton>
        <BaseButton>次要操作</BaseButton>
        <BaseButton disabled>
          不可用
        </BaseButton>
        <BaseButton loading>
          处理中
        </BaseButton>
      </div>
    </section>
    <ControlsPreview class="mt-5" />
  </main>
</template>
