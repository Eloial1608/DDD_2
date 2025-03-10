import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Media/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Media/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { FindMediaUsersByCriteriaQuery } from '@Media/MediaUser/application/FindByCriteria/FindMediaUsersByCriteriaQuery'
import { MediaUserCollectionResponse } from '@Media/MediaUser/application/MediaUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Media/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Media/User/application/UserResponse'
import { FindCommentsByCriteriaQuery } from '@Media/Comment/application/FindByCriteria/FindCommentsByCriteriaQuery'
import { CommentCollectionResponse } from '@Media/Comment/application/CommentCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'

export class CommentsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const mediaFilter = criteria.filters?.find(x => x.get('field') === 'mediaId')

      if (!mediaFilter) return res.status(400).send()

      const query = new FindMediaByIdQuery(mediaFilter.get('value') as string)

      const media = (await this.queryBus.ask<MediaResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(media.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!req.headers.authorization) return res.status(401).send()

        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, req.body.communityId)

        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (media.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) return res.status(401).send()

        const mediaUser = await this.getMediaUser(spaceMember.userId, media.id)
        if (!mediaUser) return res.status(401).send()
      }

      const commentQuery = new FindCommentsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const comments = (await this.queryBus.ask<CommentCollectionResponse>(commentQuery)).response

      return res.status(200).json(comments)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof MediaNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async getMediaUser (userId: string, mediaId: string) {
    const query = new FindMediaUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'mediaId'],
        ['operator', '='],
        ['value', mediaId]
      ])
    ])

    const user = (await this.queryBus.ask<MediaUserCollectionResponse>(query)).response.pop()

    return user
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
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
