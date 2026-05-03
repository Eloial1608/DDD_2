import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class UserGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindUserByIdQuery(req.params.id)

      const user = (await this.queryBus.ask<UserResponse>(query)).response

      return res.status(200).json(user)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}