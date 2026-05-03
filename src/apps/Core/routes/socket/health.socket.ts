import DI from '@Apps/Core/dependencyInjection/DI'
import { Socket, Server } from 'socket.io'
import { HealthController } from '@Apps/Core/controllers/socket/healthController'

export const register = (io: Server, socket: Socket) => {
  const controller = DI.getInstance().resolve<HealthController>('Apps.Core.Controllers.SocketHealthController')
  socket.on('health', (data: any) => controller.run(io, socket, data))
}
