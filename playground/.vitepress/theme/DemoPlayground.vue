<script setup lang="ts">
defineProps<{ wide?: boolean }>()
</script>

<template>
  <div class="demo-playground vp-raw">
    <div class="demo-stage">
      <div class="demo-preview" :class="{ 'demo-preview-wide': wide }">
        <slot />
      </div>
    </div>
    <div v-if="$slots.controls" class="demo-controls" role="group" aria-label="示例配置">
      <span class="demo-controls-label">配置</span>
      <div class="demo-controls-fields">
        <slot name="controls" />
      </div>
    </div>
  </div>
</template>
