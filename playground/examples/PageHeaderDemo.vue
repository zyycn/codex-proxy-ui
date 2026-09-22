<script setup lang="ts">
import { BaseIconButton, BasePageHeader } from '@codex-proxy/ui'
import { RefreshCw } from '@lucide/vue'
import { shallowRef } from 'vue'

const refreshed = shallowRef(0)
</script>

<template>
  <BasePageHeader title="配置管理" :description="`已刷新 ${refreshed} 次`">
    <template #actions>
      <BaseIconButton label="刷新配置" @click="refreshed++">
        <RefreshCw :size="16" />
      </BaseIconButton>
    </template>
  </BasePageHeader>
</template>
