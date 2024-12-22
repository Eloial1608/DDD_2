import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateIsAdminCommand } from '@Core/User/application/UpdateIsAdmin/UpdateIsAdminUserCommand'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'

export class UserIsAdminPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!await this.isAdmin(data.id, req.body.communityId) || await this.isOwner(req.params.id, req.body.communityId)) return res.status(401).send()

      const command = new UpdateIsAdminCommand(
        req.params.id,
        req.body.isAdmin,
        req.body.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async isAdmin (id: string, communityId: string): Promise<boolean> {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return !!user && (user.isAdmin || user.isOwner)
  }

  private async isOwner (id: string, communityId: string): Promise<boolean> {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return !!user && user.isOwner
  }
}
