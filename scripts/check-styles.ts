// @env node
import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { build } from 'vite'

export async function checkStyles(root: string): Promise<void> {
  const temporary = await mkdtemp(join(tmpdir(), 'codex-proxy-ui-styles-'))
  await cp(join(root, 'src'), join(temporary, 'src'), { recursive: true })
  await cp(join(root, 'vite.config.ts'), join(temporary, 'vite.config.ts'))
  await writeFile(join(temporary, 'package.json'), '{"type":"module"}')
  await symlink(join(root, 'node_modules'), join(temporary, 'node_modules'), 'dir')
  const config = { root: temporary, configFile: join(temporary, 'vite.config.ts'), logLevel: 'warn' as const }
  await build(config)
  const clean = await readFile(join(temporary, 'dist/styles.css'), 'utf8')
  assert(clean.includes('--cp-color-primary') && clean.includes('.inline-flex'), 'Clean build lost component styles')
  // 历史产物中的类名不能污染下一次组件样式构建。
  await writeFile(join(temporary, 'dist/stale.js'), 'export const stale = "w-[12347px]"')
  await build(config)
  assert.equal(await readFile(join(temporary, 'dist/styles.css'), 'utf8'), clean, 'Styles depend on a previous build')
  assert(!clean.includes('12347px'), 'Styles scanned build output')
  console.log('样式冷构建与重复构建一致，不扫描历史 dist：', temporary)
}
