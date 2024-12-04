import { defineConfig } from '@playwright/test'
export default defineConfig({
  projects: [
    {
      name: 'core',
      testDir: 'tests/apps/Core'
    },
    {
      name: 'auth',
      testDir: 'tests/apps/Auth'
    }
  ],
  use: {
    baseURL: `http://127.0.0.1:${process.env.PORT}`
  }
})
