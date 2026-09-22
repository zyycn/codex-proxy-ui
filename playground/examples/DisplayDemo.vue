<script setup lang="ts">
import { BaseCard, BaseTag } from '@codex-proxy/ui'
import { ref } from 'vue'

const visible = ref(true)
</script>

<template>
  <BaseCard title="请求工作台" description="管理页面与请求中间件" padding="compact">
    <div class="demo-row">
      <BaseTag type="success">
        已启用
      </BaseTag>
      <BaseTag type="primary">
        管理页面
      </BaseTag>
      <BaseTag type="warning">
        待授权
      </BaseTag>
      <BaseTag v-if="visible" closable @close="visible = false">
        可关闭标签
      </BaseTag>
    </div>
  </BaseCard>
</template>
