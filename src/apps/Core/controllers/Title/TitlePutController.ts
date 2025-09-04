import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TitleResponse } from '@Core/Title/application/TitleResponse'
import { FindTitleByIdQuery } from '@Core/Title/application/FindById/FindTitleByIdQuery'
import { UpdateTitleCommand } from '@Core/Title/application/Update/UpdateTitleCommand'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

export class TitlePutController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const titleQuery = new FindTitleByIdQuery(req.params.id)
      const title = await (await this.queryBus.ask<TitleResponse>(titleQuery)).response

      if (!await this.isAdmin(data.id, title.communityId)) return res.status(401).send()

      const command = new UpdateTitleCommand(
        req.params.id,
        req.body.name,
        title.communityId,
        req.body.titleImageUrl
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof TitleNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

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
}
