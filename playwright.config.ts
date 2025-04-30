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
    },
    {
      name: 'media',
      testDir: 'tests/apps/Media'
    },
    {
      name: 'threads',
      testDir: 'tests/apps/Threads'
    },
    {
      name: 'course',
      testDir: 'tests/apps/Course'
    },
    {
      name: 'events',
      testDir: 'tests/apps/Events'
    },
    {
      name: 'marketPlace',
      testDir: 'tests/apps/MarketPlace'
    }
  ],
  use: {
    baseURL: `http://127.0.0.1:${process.env.PORT}`
  }
})
