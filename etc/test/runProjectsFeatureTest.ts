import '../../src/apps/Projects/env/loadEnv'
import { exec, ChildProcess } from 'child_process'

const startServer = (): Promise<ChildProcess> => {
  return new Promise((resolve, reject) => {
    const server = exec('NODE_ENV=test ts-node -r tsconfig-paths/register src/apps/Projects/index.ts')
    server.stdout?.on('data', (data) => {
      console.log(data.toString())
      if (data.includes('is running')) {
        resolve(server)
      }
    })
    server.stderr?.on('data', (data) => {
      console.error(data.toString())
      if (!data.toString().includes('DeprecationWarning')) reject(new Error('Failed to start the server'))
    })
  })
}

const waitForServer = async (url: string, timeout = 10000): Promise<void> => {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(url)
      console.log(response.status)
      if (response.ok) return
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  throw new Error('Server did not start in time')
}

const runTests = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const tests = exec('NODE_ENV=test FORCE_COLOR=1 playwright test --project=projects --pass-with-no-tests')
    tests.stdout?.on('data', (data) => console.log(data.toString()))
    tests.stderr?.on('data', (data) => console.error(data.toString()))
    tests.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Tests failed with code ${code}`))
    })
  })
};

(async () => {
  let server: ChildProcess | null = null

  try {
    console.log('Starting server...')
    server = await startServer()
    console.log('Waiting for server to be ready...')
    await waitForServer(`http://127.0.0.1:${process.env.PORT}/health`)
    console.log('Running tests...')
    await runTests()
  } catch (err) {
    if (server) {
      console.log('Stopping server...')
      server.kill('SIGKILL')
    }
    console.error(err)
    process.exit(1)
  } finally {
    if (server) {
      console.log('Stopping server...')
      server.kill('SIGKILL')
      process.exit(0)
    }
  }
})()
