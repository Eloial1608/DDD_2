import { Server, Socket } from 'socket.io'

export abstract class Controller<T extends any> {
    abstract run (io: Server, socket: Socket, data: T): Promise<void>

    protected emitEventToRoom (io: Server, id: string, room: string, message: any) {
      io.to(room).emit(id, message)
    }

    protected emitPublicEvent (io: Server, id: string, message: any) {
      io.emit(id, message)
    }

    protected emitPrivateEvent (socket: Socket, id: string, message: any) {
      socket.emit(id, message)
    }
}
