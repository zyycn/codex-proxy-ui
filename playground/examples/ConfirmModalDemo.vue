<script setup lang="ts">
import { BaseButton, BaseConfirmModal } from '@codex-proxy/ui'
import { shallowRef } from 'vue'

const open = shallowRef(false)
const confirmations = shallowRef(0)
function confirm() {
  confirmations.value++
  open.value = false
}
</script>

<template>
  <div class="demo-row">
    <BaseButton variant="destructive" @click="open = true">
      移除示例项
    </BaseButton>
    <output aria-label="确认次数">已确认 {{ confirmations }} 次</output>
    <BaseConfirmModal v-model="open" title="移除示例项" description="此操作只更新演示计数，不会修改真实数据" destructive confirm-text="移除" @confirm="confirm" />
  </div>
</template>
