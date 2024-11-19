import { defineConfig } from 'vitest/config'
import { loadConfig } from 'tsconfig-paths'
import path from 'path'

const tsconfig = loadConfig()

const alias = tsconfig?.resultType === 'success' && tsconfig.paths
  ? Object.entries(tsconfig.paths).reduce((acc, [key, value]) => {
    acc[key.replace('/*', '')] = path.resolve(
      tsconfig.absoluteBaseUrl,
      value[0].replace('/*', '')
    )
    return acc
  }, {} as Record<string, string>)
  : {}

export default defineConfig({
  resolve: {
    alias
  },
  test: {
    include: ['tests/Contexts/**/*.test.ts'],
    globals: true,
    isolate: false,
    passWithNoTests: true
  }
})
