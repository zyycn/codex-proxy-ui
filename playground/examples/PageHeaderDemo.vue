<script setup lang="ts">
import { ZIconButton, ZPageHeader } from '@codex-proxy/ui'
import { RefreshCw } from '@lucide/vue'
import { shallowRef } from 'vue'
import DemoPlayground from '../.vitepress/theme/DemoPlayground.vue'

const refreshed = shallowRef(0)
</script>

<template>
  <DemoPlayground wide>
    <ZPageHeader title="配置管理" :description="`已刷新 ${refreshed} 次`">
      <template #actions>
        <ZIconButton aria-label="刷新配置" @click="refreshed++">
          <RefreshCw :size="16" />
        </ZIconButton>
      </template>
    </ZPageHeader>
  </DemoPlayground>
</template>
