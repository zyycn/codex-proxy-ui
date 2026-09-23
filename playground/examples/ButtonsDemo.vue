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
        <RefreshCw />
      </BaseIconButton>
      <BaseIconButton label="下载示例" disabled>
        <Download :size="16" />
      </BaseIconButton>
      <span>已操作 {{ count }} 次</span>
    </div>
    <div class="demo-row">
      <BaseIconButton size="sm" label="小号默认图标">
        <RefreshCw />
      </BaseIconButton>
      <BaseIconButton size="md" label="中号默认图标">
        <RefreshCw />
      </BaseIconButton>
      <BaseIconButton size="lg" label="大号默认图标">
        <RefreshCw />
      </BaseIconButton>
      <BaseIconButton size="sm" label="自定义 18 像素图标">
        <RefreshCw :size="18" />
      </BaseIconButton>
      <BaseIconButton size="sm" label="自定义加载图标" loading>
        <template #loading>
          <RefreshCw :size="18" class="animate-spin motion-reduce:animate-none" />
        </template>
        <RefreshCw :size="18" />
      </BaseIconButton>
    </div>
  </div>
</template>
