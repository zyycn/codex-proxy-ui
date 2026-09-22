<script setup lang="ts">
import { BaseButton, BaseIconButton } from '@codex-proxy/ui'
import { Download, RefreshCw } from '@lucide/vue'
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="demo-stack">
    <div class="demo-row">
      <BaseButton variant="primary" @click="count++">
        保存配置
      </BaseButton>
      <BaseButton>取消</BaseButton>
      <BaseButton disabled>
        不可用
      </BaseButton>
      <BaseButton loading>
        保存中
      </BaseButton>
    </div>
    <div class="demo-row">
      <BaseIconButton label="刷新示例" @click="count++">
        <RefreshCw :size="16" />
      </BaseIconButton>
      <BaseIconButton label="下载示例" disabled>
        <Download :size="16" />
      </BaseIconButton>
      <span>已操作 {{ count }} 次</span>
    </div>
  </div>
</template>
