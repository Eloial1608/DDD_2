import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindTitleByIdQuery } from '@Core/Title/application/FindById/FindTitleByIdQuery'
import { TitleResponse } from '@Core/Title/application/TitleResponse'
import { DeleteTitleCommand } from '@Core/Title/application/Delete/DeleteTitleCommand'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Chat/User/application/FindByCriteria/FindUsersByCriteriaQuery'


export class TitleDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const query = new FindTitleByIdQuery(req.params.id)

      const title = (await this.queryBus.ask<TitleResponse>(query)).response

      if (!await this.isAdmin(data.id, title.communityId)) return res.status(401).send()

      const command = new DeleteTitleCommand(req.params.id, title.communityId)

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof TitleNotFound) return res.status(400).send(e.getMessage())

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
