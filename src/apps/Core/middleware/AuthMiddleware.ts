import { Request, Response, NextFunction } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }
    }
  }
}

export class AuthMiddleware {
  constructor (private readonly decoder: TokenDecoder) {}

  run = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        res.status(401).json({ message: 'Authorization header missing' })
        return
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader

      const data = await this.decoder.run(token)

      if (!data?.id) {
        res.status(401).json({ message: 'Invalid token payload' })
        return
      }

      req.user = { id: data.id }
      next()
    } catch (e) {
      if (e instanceof CannotDecode) {
        res.status(401).json({ message: 'Invalid token' })
        return
      }

      console.error('AuthMiddleware error:', e)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}
