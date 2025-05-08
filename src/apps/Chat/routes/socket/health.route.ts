import DI from '@Apps/Chat/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Chat/controllers/API/HealthGetController'
import { Server, Socket } from 'socket.io'

export const register = (io: Server, socket: Socket) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Chat.Controllers.HealthGetController')
  socket.on('chat::sendMessage', (data) => {

  })
}
