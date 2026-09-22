<script setup lang="ts">
import { BaseCheckbox, BaseForm, BaseFormItem, BaseRadio, BaseSelect, BaseSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const status = ref('enabled')
const approved = ref(false)
const enabled = ref(true)
const scope = ref('selected')
const options = [{ label: '已启用', value: 'enabled' }, { label: '已停用', value: 'disabled' }]
</script>

<template>
  <BaseForm>
    <BaseFormItem label="状态">
      <BaseSelect v-model="status" :options="options" class="demo-wide" />
    </BaseFormItem>
    <div class="demo-row">
      <BaseCheckbox v-model="approved" label="允许修改响应头" show-label />
      <BaseSwitch v-model="enabled" label="启用配置" />
      <span>{{ enabled ? '已启用' : '已停用' }}</span>
    </div>
    <div class="demo-row">
      <BaseRadio v-model="scope" name="demo-scope" value="selected" label="指定请求" show-label />
      <BaseRadio v-model="scope" name="demo-scope" value="all" label="全部请求" show-label />
    </div>
  </BaseForm>
</template>
