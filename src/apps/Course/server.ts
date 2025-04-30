import express, { Express, Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compress from 'compression'
import { Server as HTTPServer } from 'http'
import { registerRoutes } from './routes'

export class Server {
  private express: Express
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

    this.startRoutes()
  }

  startRoutes (): void {
    registerRoutes(this.router)

    this.express.use(this.router)
  }

  start (): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.info(
              `  Gathered Course Backend is running at http://localhost:${this.port} in ${this.express.get('env')} mode`
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
