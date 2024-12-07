import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsBySuffix'

export class UserPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const tokenData = this.decoder.run(req.headers.authorization)

      let isOwner = false

      const query = new FindUsersByCriteriaQuery(
        [
          new Map<string, string>([
            ['field', 'communityId'],
            ['operator', '='],
            ['value', tokenData.communityId]
          ])
        ],
        undefined,
        undefined,
        undefined,
        1)

      const result = (await this.queryBus.ask<UserCollectionResponse>(query)).response

      if (result.length === 0) isOwner = true

      const command = new CreateUserCommand(
        tokenData.userId,
        req.body.name,
        req.body.email,
        tokenData.communityId,
        isOwner,
        isOwner
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof UserAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof UserAlreadyExistsByEmail) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
