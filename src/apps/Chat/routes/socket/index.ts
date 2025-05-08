import { glob } from 'glob'
import path from 'path'
import { Server, Socket } from 'socket.io'

export function registerSocketRoutes (io: Server, socket: Socket) {
  const routes = glob.sync(path.join(__dirname, '/**/*.route.*'), { windowsPathsNoEscape: true })
  routes.filter(route => !route.endsWith('.map')).map(route => register(route, io, socket))
}

function register (routePath: string, io: Server, socket: Socket) {
  const route = require(routePath)
  route.register(io, socket)
}
