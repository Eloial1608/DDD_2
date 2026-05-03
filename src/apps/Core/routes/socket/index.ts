import { glob } from 'glob'
import path from 'path'
import type { Server, Socket } from 'socket.io'
import type { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { createSocketAuthMiddleware } from '@Apps/Core/middleware/SocketAuthMiddleware'

export function registerSocketRoutes (io: Server, tokenDecoder: TokenDecoder) {
  io.use(createSocketAuthMiddleware(tokenDecoder))

  const routes = glob.sync(path.join(__dirname, '/**/*.socket.*'), { windowsPathsNoEscape: true })
  io.on('connection', (socket: Socket) => {
    routes.filter(route => !route.endsWith('.map')).map(route => register(route, io, socket))
  })
}

function register (routePath: string, io: Server, socket: Socket) {
  const route = require(routePath)
  route.register(io, socket)
}
