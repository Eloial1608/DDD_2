import express, { type Express, Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import { createServer } from 'http'
import type { Server as HTTPServer } from 'http'
import { registerRoutes } from './routes/http'
import { registerSocketRoutes } from './routes/socket'
import { Server as IOServer } from 'socket.io'
import DI from './dependencyInjection/DI'
import type { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'

export class Server {
  private express: Express
  private io: IOServer
  private httpServer?: HTTPServer
  private router: Router
  private port: number = Number(process.env.PORT)

  constructor () {
    this.express = express()
    this.express.use(bodyParser.json({ limit: '650kb' }))
    this.express.use(bodyParser.urlencoded({ extended: true }))
    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))
    this.express.use(compress())
    this.express.use(cors())
    this.router = Router()

    this.io = new IOServer()

    this.startRoutes()
  }

  startRoutes (): void {
    registerRoutes(this.router)

    this.express.use(this.router)
  }

  start (): Promise<void> {
    return new Promise(resolve => {
      const httpServer = createServer(this.express)
      this.httpServer = httpServer

      this.io.attach(httpServer)

      const tokenDecoder = DI.getInstance().resolve<TokenDecoder>('Shared.TokenDecoder')
      registerSocketRoutes(this.io, tokenDecoder)

      httpServer.listen(this.port, () => {
        console.info(
          `  API Core Backend is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        )
        console.info('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  stop () {
    this.httpServer?.close()
  }

  get getHTTPServer () {
    return this.httpServer
  }
}
