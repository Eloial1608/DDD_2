import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteLikeCommand } from '@Media/Like/application/Delete/DeleteLikeCommand'
import { FindLikeByIdQuery } from '@Media/Like/application/FindById/FindLikeByIdQuery'
import { LikeResponse } from '@Media/Like/application/LikeResponse'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { LikeNotFound } from '@Media/Like/domain/Errors/LikeNotFound'

export class LikeDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const like = await this.getLike(req.params.id)

      const media = await this.getMedia(like.mediaId)

      const user = await this.getUser(data.id, media.communityId)

      if (!user) return res.status(401).send()

      const command = new DeleteLikeCommand(req.params.id, user.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof MediaNotFound) return res.status(404).send(e.getMessage())
      if (e instanceof LikeNotFound) return res.status(404).send(e.getMessage())

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

  private async getLike (likeId: string) {
    const query = new FindLikeByIdQuery(likeId)

    const like = (await this.queryBus.ask<LikeResponse>(query)).response

    return like
  }

  private async getMedia (mediaId: string) {
    const query = new FindMediaByIdQuery(mediaId)

    const media = (await this.queryBus.ask<MediaResponse>(query)).response

    return media
  }
}
