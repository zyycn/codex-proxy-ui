import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoExample from './DemoExample.vue'
import Layout from './Layout.vue'
import '@codex-proxy/ui/styles.css'
import './styles.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('DemoExample', DemoExample)
  },
} satisfies Theme
