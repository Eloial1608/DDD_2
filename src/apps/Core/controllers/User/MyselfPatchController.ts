import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateAboutAndNameCommand } from '@Core/User/application/UpdateAboutAndName/UpdateAboutAndNameCommand'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class MyselfPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly decoder: TokenDecoder, private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const user = await this.getUserFromCommunity(data.id, req.params.communityId)

      if (!user) return res.status(404).send()

      const command = new UpdateAboutAndNameCommand(
        user.id,
        req.body.about,
        req.body.name,
        req.body.username,
        req.body.pictureUrl,
        req.body.bannerUrl
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async getUserFromCommunity (userId: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
  }
}
