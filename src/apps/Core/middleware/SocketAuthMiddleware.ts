import type { ExtendedError } from 'socket.io/dist/namespace'
import type { Socket } from 'socket.io'
import type { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import type { TokenData } from '@Shared/domain/TokenDecoder/TokenData'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'

export type SocketWithAuth = Socket & { data: { tokenData?: TokenData } }

function getTokenFromHandshake (socket: Socket): string | null {
  const auth = socket.handshake.auth as { token?: string }
  if (auth?.token) return auth.token

  const query = socket.handshake.query as { token?: string }
  if (typeof query?.token === 'string') return query.token

  const authHeader = socket.handshake.headers?.authorization
  if (typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) return authHeader.slice(7)
    return authHeader
  }

  return null
}

export function createSocketAuthMiddleware (decoder: TokenDecoder) {
  return (socket: Socket, next: (err?: ExtendedError) => void): void => {
    const token = getTokenFromHandshake(socket)

    if (!token) {
      next(new Error('Unauthorized') as ExtendedError)
      return
    }

    try {
      const tokenData = decoder.run(token)
      ;(socket as SocketWithAuth).data.tokenData = tokenData
      next()
    } catch (e) {
      if (e instanceof CannotDecode) {
        next(new Error('Unauthorized') as ExtendedError)
        return
      }
      next(new Error('Unauthorized') as ExtendedError)
    }
  }
}
