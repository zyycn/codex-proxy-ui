<script setup lang="ts">
import { BaseButton, BaseModal, BasePopover } from '@codex-proxy/ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="demo-row">
    <BaseButton variant="primary" @click="open = true">
      编辑配置
    </BaseButton>
    <BasePopover trigger="click" placement="bottom-start">
      <template #trigger>
        <BaseButton>授权说明</BaseButton>
      </template>
      <div class="p-4">
        插件只会使用已明确授予的权限
      </div>
    </BasePopover>
    <BaseModal v-model="open" title="编辑配置" description="变更在保存后生效" size="sm">
      <div class="demo-stack">
        <span>按 Escape 或点击取消可以关闭弹窗</span>
        <BaseButton @click="open = false">
          取消
        </BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
