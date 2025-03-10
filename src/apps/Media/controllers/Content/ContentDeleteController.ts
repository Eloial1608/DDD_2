import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { DeleteContentCommand } from '@Media/Content/application/Delete/DeleteContentCommand'
import { FindContentByIdQuery } from '@Media/Content/application/FindById/FindContentByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { ContentResponse } from '@Media/Content/application/ContentResponse'

export class ContentDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const contentQuery = new FindContentByIdQuery(req.params.id)

      const content = (await this.queryBus.ask<ContentResponse>(contentQuery)).response

      const mediaQuery = new FindMediaByIdQuery(content.mediaId)

      const media = (await this.queryBus.ask<MediaResponse>(mediaQuery)).response

      const user = await this.getUser(data.id, media.communityId)

      if (!user) return res.status(401).send()

      if (media.userId !== user.id && !user.isAdmin && !user.isOwner) return res.status(401).send()

      const command = new DeleteContentCommand(
        req.params.id,
        user.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }

  private async getUser (id: string, communityId: string) {
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

    return user
  }
}
