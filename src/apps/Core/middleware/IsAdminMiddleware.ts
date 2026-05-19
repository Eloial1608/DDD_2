import { Request, Response, NextFunction } from 'express'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserResponse } from '@Core/User/application/UserResponse'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'

export class IsAdminMiddleware {
  constructor (
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  run = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.headers.authorization) {
        res.status(401).send()
        return
      }

      const data = await this.decoder.run(req.headers.authorization)

      const userResponse = await this.queryBus.ask<UserResponse>(
        new FindUserByIdQuery(data.id)
      )

      if (!userResponse.response.isAdmin) {
        res.status(401).send()
        return
      }

      next()
    } catch (e) {
      if (e instanceof CannotDecode) {
        res.status(401).send(e.getMessage())
        return
      }
      if (e instanceof UserNotFound) {
        res.status(404).send(e.getMessage())
        return
      }
      res.status(500).send()
    }
  }
}