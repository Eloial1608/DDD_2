import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CreateLikeCommand } from '@Media/Like/application/Create/CreateLikeCommand'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { LikeNotFound } from '@Media/Like/domain/Errors/LikeNotFound'

export class LikePostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const media = await this.getMedia(req.body.mediaId)

      const user = await this.getUser(data.id, media.communityId)

      if (!user) return res.status(401).send()

      const command = new CreateLikeCommand(req.params.id, media.id, user.id)

      await this.commandBus.dispatch(command)

      return res.status(201).send()
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

  private async getMedia (mediaId: string) {
    const query = new FindMediaByIdQuery(mediaId)

    const media = (await this.queryBus.ask<MediaResponse>(query)).response

    return media
  }
}
