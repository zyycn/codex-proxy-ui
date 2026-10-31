import type { CSSOptions } from 'vite'
import { resolve } from 'node:path'
import loadPostcssConfig from 'postcss-load-config'
import { searchForWorkspaceRoot } from 'vite'
import { defaultThemePrefix } from '../theme/namespace'

type PostcssConfig = Exclude<CSSOptions['postcss'], string | undefined>

export async function themePrefixStyles(
  prefix: string,
  root: string,
  existing: CSSOptions['postcss'],
): Promise<PostcssConfig> {
  const source = `--${defaultThemePrefix}-`
  const target = `--${prefix}-`
  const plugin: NonNullable<PostcssConfig['plugins']>[number] = {
    postcssPlugin: 'codex-proxy-ui-theme-prefix',
    // 在完整样式树上处理一次，涵盖导入的样式，同时保留组件与 utility 类名
    OnceExit(styles) {
      styles.walkDecls((declaration) => {
        if (declaration.prop.startsWith(source))
          declaration.prop = declaration.prop.replace(source, target)
        declaration.value = declaration.value.replaceAll(source, target)
      })
      styles.walkAtRules((rule) => {
        rule.params = rule.params.replaceAll(source, target)
      })
    },
  }

  // Vite 会合并内联插件数组；外部配置由同一配置加载器读取，避免覆盖消费方插件
  if (typeof existing === 'object')
    return { plugins: [plugin] }

  const searchPath = typeof existing === 'string' ? resolve(root, existing) : root
  try {
    const loaded = await loadPostcssConfig({}, searchPath, { stopDir: searchForWorkspaceRoot(root) })
    return { ...loaded.options, plugins: [...loaded.plugins, plugin] }
  }
  catch (error) {
    if (error instanceof Error && error.message.startsWith('No PostCSS Config found in:'))
      return { plugins: [plugin] }
    throw error
  }
}
