<script setup lang="ts">
import { BaseMenuItem } from '@codex-proxy/ui'
import { Copy, Pencil, Trash2 } from '@lucide/vue'
import { shallowRef } from 'vue'

const action = shallowRef('尚未操作')
</script>

<template>
  <div class="demo-stack">
    <div class="w-full max-w-64 rounded-cp bg-cp-bg-elevated p-1">
      <BaseMenuItem @click="action = '编辑配置'">
        <template #icon>
          <Pencil :size="14" />
        </template>
        编辑
      </BaseMenuItem>
      <BaseMenuItem disabled>
        <template #icon>
          <Copy :size="14" />
        </template>
        复制（不可用）
      </BaseMenuItem>
      <BaseMenuItem loading>
        处理中
      </BaseMenuItem>
      <BaseMenuItem tone="destructive" @click="action = '移除示例项'">
        <template #icon>
          <Trash2 :size="14" />
        </template>
        移除
      </BaseMenuItem>
    </div>
    <output aria-label="当前操作">{{ action }}</output>
  </div>
</template>
