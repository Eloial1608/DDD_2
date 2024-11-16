import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    test: {
        globals: true,
        isolate: false
      },
      plugins: [tsconfigPaths({ root: __dirname })]
})