import './env/loadEnv'
import DI from './dependencyInjection/DI'
import { Server } from './server'

let application: Server
const di = DI.getInstance()

export const starter = async () => {
  await di.initialize()
  application = new Server()
  await application.start()
}

try {
  starter()
} catch (e) {
  console.log(e)
  process.exit(1)
}

process.on('SIGTERM', function onSigterm () {
  console.log('Got SIGTERM. Graceful shutdown start', new Date().toISOString())
  application.stop()
  process.exit()
})

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
