// @env node
import assert from 'node:assert/strict'
import { BaseTable, defineTableColumns } from '@codex-proxy/ui/table'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

const rows = [{ id: 'example', name: '示例数据' }]
const columns = defineTableColumns<typeof rows[number]>([{ key: 'name', label: '名称' }])

// 独立消费方不注册任何指令，覆盖初次加载、刷新、空状态与表头保留两种布局。
for (const loading of [false, true]) {
  for (const showHeaderWhenEmpty of [false, true]) {
    for (const data of [[], rows]) {
      const warnings: string[] = []
      const app = createSSRApp({
        render: () => h(BaseTable, { columns, rows: data, loading, showHeaderWhenEmpty }),
      })
      app.config.warnHandler = message => warnings.push(message)
      const html = await renderToString(app)
      assert.deepEqual(warnings, [], 'Table must render without global directives or Vue warnings')
      assert.equal((html.match(/role="status"/gu) ?? []).length, loading ? 1 : 0)
      assert.equal(html.includes('aria-busy="true"'), loading)
      assert.equal(html.includes('加载中'), loading)
      assert.equal(html.includes('暂无数据'), !loading && data.length === 0)
      assert.equal(html.includes('<thead>'), showHeaderWhenEmpty || data.length > 0)
      assert.equal(html.includes('示例数据'), data.length > 0)
    }
  }
}
console.log('表格独立渲染与 8 种加载 / 空状态组合通过')
