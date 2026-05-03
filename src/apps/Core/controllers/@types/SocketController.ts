import { Server, Socket } from 'socket.io'

export abstract class SocketController<T extends object, O extends object> {
  abstract run (io: Server, socket: Socket, data: T): Promise<void>

  protected sendToSocket (socket: Socket, ev: string, data: O) {
    socket.emit(ev, data)
  }

  protected sendToEveryone (io: Server, ev: string, data: O) {
    io.emit(ev, data)
  }

  protected sendToRoom (io: Server, ev: string, data: O, room: string) {
    io.to(room).emit(ev, data)
  }
}
