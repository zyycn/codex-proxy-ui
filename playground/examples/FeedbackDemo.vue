<script setup lang="ts">
import { BaseButton, BaseEmpty, BaseSkeleton, BaseToast, toast } from '@codex-proxy/ui'
</script>

<template>
  <div class="demo-stack">
    <BaseEmpty title="暂无插件" description="安装插件后即可开始配置">
      <template #action>
        <BaseButton variant="primary" @click="toast.success('已打开安装入口')">
          安装插件
        </BaseButton>
      </template>
    </BaseEmpty>
    <BaseSkeleton class="h-4 w-40" />
    <div class="demo-row">
      <BaseButton @click="toast.success('配置已保存')">
        成功提示
      </BaseButton>
      <BaseButton @click="toast.error('请检查下载来源')">
        错误提示
      </BaseButton>
    </div>
    <BaseToast />
  </div>
</template>
