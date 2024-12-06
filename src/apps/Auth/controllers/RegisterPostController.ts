import { Request, Response } from 'express'
import { Controller } from './@types/Controller'
import { GenerateTokenResponse } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenResponse'
import { AuthUserNotFound } from '@Auth/AuthUser/domain/Errors/AuthUserNotFound'
import { CreateAuthUserCommand } from '@Auth/AuthUser/application/Create/CreateAuthUserCommand'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { v4 } from 'uuid'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { GenerateTokenQuery } from '@Auth/AuthUser/application/GenerateToken/GenerateTokenQuery'
import { InvalidSecret } from '@Auth/AuthUser/domain/Errors/InvalidSecret'
import { AuthUserAlreadyExists } from '@Auth/AuthUser/domain/Errors/AuthUserAlreadyExists'

export class RegisterPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new CreateAuthUserCommand(
        req.params.id,
        req.body.email,
        req.body.method,
        req.body.secret,
        v4(),
        req.body.communityId
      )

      await this.commandBus.dispatch(command)

      const query = new GenerateTokenQuery(req.body.email, req.body.communityId, req.body.method, req.body.secret)

      const result = (await this.queryBus.ask<GenerateTokenResponse>(query)).response

      return res.status(201).json({
        token: result
      })
    } catch (e) {
      console.log(e)
      if (e instanceof AuthUserNotFound) return res.status(401).send()
      if (e instanceof AuthUserAlreadyExists) return res.status(401).send()
      if (e instanceof InvalidSecret) return res.status(400).send()

      return res.status(500).send()
    }
  }
}
