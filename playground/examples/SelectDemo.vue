<script setup lang="ts">
import { BaseCheckbox, BaseForm, BaseFormItem, BaseNumberInput, BaseRadio, BaseSelect, BaseSwitch } from '@codex-proxy/ui'
import { ref } from 'vue'

const status = ref('enabled')
const approved = ref(false)
const enabled = ref(true)
const scope = ref('selected')
const options = [{ label: '已启用', value: 'enabled' }, { label: '已停用', value: 'disabled' }]
const maxCollapseTags = ref(1)
const selected = ref(['production', 'testing', 'team'])
const expanded = ref(['production', 'testing'])
const disabled = ref(false)
const groups = [
  { label: '生产环境', value: 'production' },
  { label: '测试环境', value: 'testing' },
  { label: '团队共享', value: 'team' },
  { label: '开发环境', value: 'development' },
  { label: '长名称分组用于验证窄窗口中的标签截断与完整提示', value: 'long' },
  { label: '暂停使用', value: 'paused', disabled: true },
]
</script>

<template>
  <BaseForm>
    <BaseFormItem label="状态">
      <BaseSelect v-model="status" :options="options" class="demo-wide" />
    </BaseFormItem>
    <BaseFormItem label="显示标签数量">
      <BaseNumberInput v-model="maxCollapseTags" :min="1" :max="5" label="显示标签数量" />
    </BaseFormItem>
    <BaseFormItem label="账号分组（折叠多选）">
      <BaseSelect v-model="selected" :options="groups" multiple filterable collapse-tags collapse-tags-tooltip :max-collapse-tags="maxCollapseTags" :disabled="disabled" placeholder="选择分组" class="demo-wide" />
    </BaseFormItem>
    <BaseFormItem label="账号分组（展开标签）">
      <BaseSelect v-model="expanded" :options="groups" multiple :disabled="disabled" class="demo-wide" />
    </BaseFormItem>
    <div class="demo-row">
      <BaseSwitch v-model="disabled" label="禁用多选" />
      <span>禁用多选</span>
    </div>
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
