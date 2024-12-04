import { Request, Response } from 'express'
import { Controller } from './@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { GenerateTokenQuery } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenQuery'
import { GenerateTokenResponse } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenResponse'
import { AuthUserNotFound } from '@Auth/AuthUser/domain/Errors/AuthUserNotFound'

export class LoginPostController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new GenerateTokenQuery(req.body.email, req.body.communityId, req.body.method, req.body.secret)

      const result = (await this.queryBus.ask<GenerateTokenResponse>(query)).response

      return res.status(200).json({
        token: result
      })
    } catch (e) {
      if (e instanceof AuthUserNotFound) return res.status(401).send()

      return res.status(500).send()
    }
  }
}
