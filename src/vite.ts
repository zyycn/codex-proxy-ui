import type { CSSOptions, Plugin } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { searchForWorkspaceRoot } from 'vite'
import { themePrefixStyles } from './build/theme-prefix'
import { defaultThemePrefix } from './theme/namespace'

export interface CodexProxyUIOptions {
  /** 本地 UI 仓库目录；省略时使用已安装的编译产物。 */
  source?: URL
  /** CSS 变量前缀，与组件导出名及 utility 类名独立 */
  themePrefix?: string
}

export default function CodexProxyUI({ source, themePrefix = defaultThemePrefix }: CodexProxyUIOptions = {}) {
  if (!/^[a-z][a-z0-9-]*$/.test(themePrefix))
    throw new Error('主题前缀必须以小写字母开头，只能包含小写字母、数字和连字符')

  return {
    name: 'codex-proxy-ui',
    // 配置类型只暴露读取的字段，供文档站与应用共用。
    async config(this: void, config: { root?: string, server?: { fs?: { allow?: string[] } }, css?: { postcss?: CSSOptions['postcss'] } }) {
      const dedupe = ['vue', '@lucide/vue']
      const customPrefix = themePrefix !== defaultThemePrefix
      const shared = {
        define: { __CODEX_PROXY_UI_THEME_PREFIX__: JSON.stringify(themePrefix) },
        ...(customPrefix
          ? {
              css: { postcss: await themePrefixStyles(themePrefix, resolve(config.root ?? process.cwd()), config.css?.postcss) } as Pick<CSSOptions, 'postcss'>,
              // 预构建不能固化库内默认前缀，源码和编译产物都由当前项目替换构建常量
              optimizeDeps: { exclude: ['@codex-proxy/ui'] },
            }
          : {}),
      }
      if (!source)
        return { ...shared, resolve: { dedupe } }

      const root = fileURLToPath(source)
      const manifest = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8')) as {
        name: string
        exports: Record<string, string | { 'codex-proxy-source'?: string }>
      }
      if (manifest.name !== '@codex-proxy/ui')
        throw new Error(`UI 源码目录不是 @codex-proxy/ui：${root}`)

      // 公开路径只在 exports 中声明；精确入口必须排在组件通配入口前。
      const alias = Object.entries(manifest.exports)
        .sort(([a], [b]) => Number(a.includes('*')) - Number(b.includes('*')))
        .flatMap(([key, entry]) => {
          const target = typeof entry === 'object' ? entry['codex-proxy-source'] : undefined
          if (!target)
            return []
          const id = key === '.' ? manifest.name : `${manifest.name}${key.slice(1)}`
          const pattern = id.split('*').map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('(.+)')
          return [{ find: new RegExp(`^${pattern}$`), replacement: resolve(root, target.replace('*', '$1')) }]
        })

      return {
        ...shared,
        resolve: { dedupe, alias },
        // Vue 源组件不能与内联共享状态的预构建入口混用。
        optimizeDeps: { exclude: [manifest.name] },
        server: {
          fs: {
            // Vite 会合并调用方已有的 allow；未设置时保留默认工作区范围。
            allow: config.server?.fs?.allow ? [root] : [searchForWorkspaceRoot(config.root ?? process.cwd()), root],
          },
        },
      }
    },
    transformIndexHtml() {
      return [{ tag: 'meta', attrs: { name: 'codex-proxy-ui-theme-prefix', content: themePrefix }, injectTo: 'head' }]
    },
  } satisfies Plugin
}
