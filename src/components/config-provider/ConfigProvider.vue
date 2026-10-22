<script setup lang="ts">
import type { UiLocale } from '../../locale/types'
import { provide } from 'vue'
import { localeKey, useLocale } from '../../locale/context'

const props = defineProps<{ locale?: UiLocale }>()
provide(localeKey, useLocale(() => props.locale))
</script>

<template>
  <slot />
</template>
