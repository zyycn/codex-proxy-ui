declare module '#vitepress-sidebar' {
  import type { DefineComponent } from 'vue'

  // 默认主题内部 SFC 未附带声明，在适配入口描述实际使用的属性合同。
  const VPSidebar: DefineComponent<{ open: boolean }>
  export default VPSidebar
}
