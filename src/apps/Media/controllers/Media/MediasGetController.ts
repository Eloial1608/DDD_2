import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Media/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Media/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { MediaResponseBody } from '@Media/Media/application/MediaResponse'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'
import { FindMediaByCriteriaQuery } from '@Media/Media/application/FindByCriteria/FindMediaByCriteriaQuery'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { MediaCollectionResponse } from '@Media/Media/application/MediaCollectionResponse'
import { UserResponseBody } from '@Media/User/application/UserResponse'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMemberResponseBody } from '@Media/SpaceMember/application/SpaceMemberResponse'
import { FindMediaUsersByCriteriaQuery } from '@Media/MediaUser/application/FindByCriteria/FindMediaUsersByCriteriaQuery'
import { MediaUserCollectionResponse } from '@Media/MediaUser/application/MediaUserCollectionResponse'
import { FindLikesByCriteriaQuery } from '@Media/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { LikeCollectionResponse } from '@Media/Like/application/LikeCollectionResponse'

type MediaGetControllerResponseBody = {
  readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
    readonly bannerUrl: Nullable<string>
    readonly spaceId: string
    readonly likeId?: string
    readonly author: {
      id: string
      mainId: string
      name: string
      username: string
      bannerUrl: Nullable<string>
      pictureUrl: Nullable<string>
    }
    readonly isPaid: boolean
    totalLikes: number
    totalComments: number
    isLocked: boolean
    readonly price: Nullable<{value: number, currency: string}>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class MediasGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindMediaByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const medias = (await this.queryBus.ask<MediaCollectionResponse>(query)).response

      const mediaToSend = []

      for (const media of medias) {
        const p = await this.filterMedia(media, req.headers.authorization as string)
        if (p) mediaToSend.push(await this.buildResponse(p))
      }

      return res.status(200).json(mediaToSend)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof MediaNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterMedia (media: MediaResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(media.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, media.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return null

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    if (media.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return this.getMediaWithoutContent(media)
      const mediaUser = await this.getMediaUser(spaceMember.userId, media.id)
      if (!mediaUser) return this.getMediaWithoutContent(media)
    }

    return media
  }

  private getMediaWithoutContent (media: MediaResponseBody) {
    return {
      ...media,
      isLocked: true
    }
  }

  private async buildResponse (media: Partial<MediaGetControllerResponseBody>, mainId?: string) : Promise<MediaGetControllerResponseBody> {
    let user

    if (mainId) user = await this.getUser(mainId, media.communityId!)

    return {
      ...media as MediaGetControllerResponseBody,
      likeId: user ? (await this.getLikeId(user.id, media.id!))?.id : undefined
    }
  }

  private async getLikeId (userId: string, mediaId: string) {
    const query = new FindLikesByCriteriaQuery([
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

    const user = (await this.queryBus.ask<LikeCollectionResponse>(query)).response.pop()

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
}
