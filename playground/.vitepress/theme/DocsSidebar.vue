<script setup lang="ts">
import { ZScrollbar } from '@codex-proxy/ui'
import { useSidebar } from 'vitepress/theme'
import VPSidebar from '#vitepress-sidebar'

defineProps<{ open: boolean }>()

const { hasSidebar } = useSidebar()
</script>

<template>
  <ZScrollbar v-if="hasSidebar" class="docs-sidebar-scrollbar" :class="{ open }" @click.stop>
    <VPSidebar :open="open">
      <template #sidebar-nav-before>
        <slot name="sidebar-nav-before" />
      </template>
      <template #sidebar-nav-after>
        <slot name="sidebar-nav-after" />
      </template>
    </VPSidebar>
  </ZScrollbar>
</template>

<style scoped>
/* 外层负责滚动和抽屉定位，菜单渲染、折叠与页面锁定沿用 VitePress。 */
.docs-sidebar-scrollbar {
  position: fixed;
  top: var(--vp-layout-top-height, 0px);
  bottom: 0;
  left: 0;
  z-index: var(--vp-z-index-sidebar);
  width: calc(100vw - 64px);
  max-width: 320px;
  height: auto;
  background: var(--vp-sidebar-bg-color);
  box-shadow: var(--vp-c-shadow-3);
  visibility: hidden;
  opacity: 0;
  transform: translateX(-100%);
  transition:
    visibility 0.25s,
    opacity 0.25s,
    transform 0.25s ease;
}

.docs-sidebar-scrollbar.open {
  visibility: visible;
  opacity: 1;
  transform: translateX(0);
}

.docs-sidebar-scrollbar > :deep(:first-child) {
  overscroll-behavior: contain;
}

.docs-sidebar-scrollbar :deep(.VPSidebar) {
  position: static;
  width: 100%;
  max-width: none;
  overflow: visible;
  opacity: 1;
  box-shadow: none;
  transform: none;
  transition: none;
}

@media (min-width: 960px) {
  .docs-sidebar-scrollbar {
    top: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px));
    width: var(--vp-sidebar-width);
    max-width: none;
    box-shadow: none;
    visibility: visible;
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .docs-sidebar-scrollbar {
    transition: none;
  }
}
</style>
