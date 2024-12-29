import { defineConfig } from '@playwright/test'
export default defineConfig({
  workers: 1,
  projects: [
    {
      name: 'core',
      testDir: 'tests/apps/Core'
    },
    {
      name: 'auth',
      testDir: 'tests/apps/Auth'
    },
    {
      name: 'posts',
      testDir: 'tests/apps/Posts'
    }
  ],
  use: {
    baseURL: `http://127.0.0.1:${process.env.PORT}`
  }
})
