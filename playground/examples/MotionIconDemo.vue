<script setup lang="ts">
import { BaseMotionIcon } from '@codex-proxy/ui'
import { Box, Sparkles } from '@lucide/vue'
</script>

<template>
  <div class="demo-row">
    <BaseMotionIcon class="inline-grid size-14 place-items-center rounded-cp-lg bg-cp-fill-tertiary text-cp-primary-text">
      <Box :size="28" />
    </BaseMotionIcon>
    <BaseMotionIcon variant="brand" class="inline-grid size-14 place-items-center rounded-cp-lg bg-cp-fill-tertiary text-cp-primary-text">
      <Sparkles :size="28" />
    </BaseMotionIcon>
    <span>移动指针查看反馈，系统减少动态效果时不播放</span>
  </div>
</template>
