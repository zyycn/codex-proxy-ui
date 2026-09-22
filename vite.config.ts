import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const externalDependency = /^(?:vue|@ant-design\/colors|@ant-design\/fast-color|@lucide\/vue|@vueuse\/core|@vueuse\/integrations|dompurify|es-toolkit|gsap|marked|sortablejs)(?:\/|$)/u

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: {
        'index': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'theme/index': fileURLToPath(new URL('./src/theme/index.ts', import.meta.url)),
        'styles': fileURLToPath(new URL('./src/styles/index.ts', import.meta.url)),
        ...Object.fromEntries(readdirSync(new URL('./src/components', import.meta.url)).filter(name => existsSync(new URL(`./src/components/${name}/index.ts`, import.meta.url))).map(name => [
          `components/${name}/index`,
          fileURLToPath(new URL(`./src/components/${name}/index.ts`, import.meta.url)),
        ])),
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
      cssFileName: 'styles',
    },
    rolldownOptions: {
      external: externalDependency,
      output: {
        preserveModules: true,
        preserveModulesRoot: fileURLToPath(new URL('./src', import.meta.url)),
        entryFileNames: '[name].js',
      },
    },
  },
})
