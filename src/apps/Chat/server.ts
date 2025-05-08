import express, { Express, Router } from 'express'
import cors from 'cors'
import { Server as SIO } from 'socket.io'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import { createServer, Server as HTTPServer } from 'http'
import { registerApiRoutes } from './routes/API'
import { registerSocketRoutes } from './routes/socket'

export class Server {
  private express: Express
  private server: HTTPServer
  private io: SIO
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

    this.startApiRoutes()

    this.server = createServer(this.express)
    this.io = new SIO(this.server)
  }

  startApiRoutes (): void {
    registerApiRoutes(this.router)

    this.express.use(this.router)
  }

  startSocket (): void {
    this.io.on('connection', (socket) => {
      console.log('a user connected')
      registerSocketRoutes(this.io, socket)
    })
  }

  start (): Promise<void> {
    return new Promise(resolve => {
      this.startSocket()

      this.server.listen(this.port, () => {
        console.info(
                `  Gathered Chat Backend is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        )
        console.info('  Press CTRL-C to stop\n')
        resolve()
      })
    })
  }

  stop () {
    this.server.close()
  }

  get getHTTPServer () {
    return this.server
  }
}
