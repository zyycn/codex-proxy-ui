<script setup lang="ts">
import { useLocale } from '../../locale/context'
import Button from '../button/Button.vue'
import Dialog from '../dialog/Dialog.vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    destructive?: boolean
    confirmText?: string
    cancelText?: string
    loading?: boolean
    confirmDisabled?: boolean
  }>(),
  {
    destructive: false,
    loading: false,
    confirmDisabled: false,
  },
)

const emit = defineEmits<{
  confirm: []
  cancel: []
  open: []
  opened: []
  close: []
  closed: []
}>()

const locale = useLocale()

const open = defineModel<boolean>({ default: false })
function handleCancel() {
  if (props.loading)
    return
  open.value = false
  emit('cancel')
}

function handleConfirm() {
  if (props.loading || props.confirmDisabled)
    return
  emit('confirm')
}
</script>

<template>
  <Dialog
    v-model="open"
    :title="title"
    :description="description"
    width="28rem"
    :type="destructive ? 'danger' : 'warning'"
    role="alertdialog"
    :show-close="!loading"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    @open="emit('open')"
    @opened="emit('opened')"
    @close="emit('close')"
    @closed="emit('closed')"
  >
    <div
      v-if="$slots.default"
      class="text-cp-lg leading-[1.55] font-emphasis text-cp-text-secondary"
    >
      <slot />
    </div>

    <template #footer>
      <Button :disabled="loading" @click="handleCancel">
        {{ cancelText ?? locale.common.cancel }}
      </Button>
      <Button
        :type="destructive ? 'danger' : 'primary'" :variant="destructive ? 'plain' : 'solid'"
        :loading="loading"
        :disabled="confirmDisabled"
        @click="handleConfirm"
      >
        {{ confirmText ?? locale.common.confirm }}
      </Button>
    </template>
  </Dialog>
</template>
