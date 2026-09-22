// @env node
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cp, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { checkStyles } from './check-styles.ts'
import { checkTreeShaking } from './check-tree-shaking.ts'

const root = resolve(import.meta.dirname, '..')
const temporary = await mkdtemp(join(tmpdir(), 'codex-proxy-ui-package-'))
function run(command: string, args: string[], cwd: string): void {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' })
  if (result.status !== 0)
    throw new Error(`${command} ${args.join(' ')} failed`)
}
const manifest = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
await checkStyles(root)
run('pnpm', ['pack', '--pack-destination', temporary], root)
const archive = join(temporary, `codex-proxy-ui-${manifest.version}.tgz`)
const consumer = join(temporary, 'consumer')
await cp(join(root, 'scripts/fixtures/basic'), join(consumer, 'src'), { recursive: true })
await cp(join(root, 'scripts/fixtures/basic/index.html'), join(consumer, 'index.html'))
await writeFile(join(consumer, 'package.json'), JSON.stringify({
  private: true,
  type: 'module',
  packageManager: manifest.packageManager,
  dependencies: { '@codex-proxy/ui': `file:${archive}`, 'vue': manifest.devDependencies.vue },
  devDependencies: Object.fromEntries(['vite', 'typescript', 'vue-tsc', '@vue/tsconfig', '@vitejs/plugin-vue', 'tailwindcss', '@tailwindcss/vite', '@types/node'].map(name => [name, manifest.devDependencies[name]])),
}, null, 2))
await writeFile(join(consumer, 'pnpm-workspace.yaml'), 'packages:\n  - "."\nautoInstallPeers: false\n')
// 独立消费发布包，不允许源码 alias 或主仓 workspace 掩盖遗漏的导出。
await writeFile(join(consumer, 'vite.config.ts'), `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [vue(), tailwindcss()], resolve: { dedupe: ['vue'] } })\n`)
await writeFile(join(consumer, 'tsconfig.json'), JSON.stringify({ extends: '@vue/tsconfig/tsconfig.dom.json', compilerOptions: { types: ['vite/client'], strict: true }, include: ['src/**/*.ts', 'src/**/*.vue'] }))
run('pnpm', ['install', '--ignore-scripts'], consumer)
const installed = join(consumer, 'node_modules/@codex-proxy/ui')
for (const path of ['dist/index.js', 'dist/theme/index.js', 'dist/styles.css', 'dist/types/index.d.ts', 'dist/types/theme/index.d.ts', 'src/styles/tailwind.css'])
  assert((await readFile(join(installed, path))).length > 0, `Empty package entry: ${path}`)
run('pnpm', ['exec', 'vue-tsc', '--noEmit'], consumer)
await cp(join(root, 'scripts/fixtures/table-render.ts'), join(consumer, 'check-table.ts'))
run('node', ['check-table.ts'], consumer)
run('pnpm', ['exec', 'vite', 'build'], consumer)
await checkTreeShaking(consumer)
// 不接入 Tailwind 的普通 Vue 应用也必须能使用完整样式，开发入口不能隐式要求 CSS 编译插件。
await writeFile(join(consumer, 'vite.config.ts'), `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({ plugins: [vue()], resolve: { dedupe: ['vue'], conditions: ['development'] } })\n`)
await writeFile(join(consumer, 'src/styles.css'), '')
run('pnpm', ['exec', 'vite', 'build'], consumer)
console.log(`发布包独立安装、类型与页面构建通过\n${archive}\n验收目录：${consumer}`)
