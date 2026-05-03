import { SocketController } from '../@types/SocketController'
import { Server, Socket } from 'socket.io'

type InputParams = {}
type OutputParams = { ok: true }

export class HealthController extends SocketController<InputParams, OutputParams> {
  async run (io: Server, socket: Socket, data: InputParams) {
    this.sendToSocket(socket, 'health', { ok: true })
  }
}
