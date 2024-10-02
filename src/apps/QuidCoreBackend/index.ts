import IoC from "./IoC/IoC"
import { Server } from "./server"

const application = new Server()
const ioc = IoC.getInstance()

const starter = async () => {
    await ioc.initialize()
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