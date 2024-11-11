import DI from "./dependencyInjection/DI"
import { Server } from "./server"

const application = new Server()
const di = DI.getInstance()

const starter = async () => {
    await di.initialize()
    application.start()
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