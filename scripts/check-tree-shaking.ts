// @env node
import assert from 'node:assert/strict'
import { Buffer } from 'node:buffer'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { build } from 'vite'

export async function checkTreeShaking(consumer: string): Promise<void> {
  const sizes: Record<string, number> = {}
  for (const [name, source] of Object.entries({
    root: 'export { BaseButton } from \'@codex-proxy/ui\'',
    component: 'export { BaseButton } from \'@codex-proxy/ui/button\'',
    theme: 'export { resolveTheme } from \'@codex-proxy/ui/theme\'',
  })) {
    const entry = join(consumer, `${name}.ts`)
    await writeFile(entry, source)
    const result = await build({
      configFile: false,
      root: consumer,
      logLevel: 'warn',
      resolve: { dedupe: ['vue'] },
      build: {
        write: false,
        minify: false,
        lib: { entry, formats: ['es'] },
        rolldownOptions: { external: id => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('@codex-proxy/ui') },
      },
    })
    const outputs = Array.isArray(result) ? result : [result]
    const code: string[] = []
    const modules: string[] = []
    for (const output of outputs) {
      assert('output' in output, 'Expected a completed build')
      for (const chunk of output.output) {
        assert.equal(chunk.type, 'chunk', `${name} unexpectedly imported CSS`)
        if (chunk.type === 'chunk') {
          code.push(chunk.code)
          modules.push(...Object.entries(chunk.modules).filter(([, module]) => module.renderedLength > 0).map(([id]) => id))
          assert(!chunk.imports.some(id => /marked|dompurify|sortablejs|gsap/u.test(id)), `${name} retained an unrelated dependency`)
        }
      }
    }
    assert(!modules.some(id => /components\/(?:table|markdown|modal|toast)\//u.test(id)), `${name} retained unrelated UI modules`)
    if (name === 'theme')
      assert(!modules.some(id => id.includes('/components/')), 'Theme entry retained components')
    else
      assert(modules.some(id => id.includes('/components/button/')), 'Button was incorrectly removed')
    sizes[name] = Buffer.byteLength(code.join('\n'))
  }
  assert.equal(sizes.root, sizes.component, 'Root named import must shake down to the same code as the component entry')
  console.log('Tree-shaking 通过（外部依赖不计入体积）：', sizes)
}
