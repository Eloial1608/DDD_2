import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Threads/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse } from '@Threads/Thread/application/ThreadResponse'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'
import { FindThreadUsersByCriteriaQuery } from '@Threads/ThreadUser/application/FindByCriteria/FindThreadUsersByCriteriaQuery'
import { ThreadUserCollectionResponse } from '@Threads/ThreadUser/application/ThreadUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Threads/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Threads/User/application/UserResponse'
import { FindLikesByCriteriaQuery } from '@Threads/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { LikeCollectionResponse } from '@Threads/Like/application/LikeCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'

export class LikesGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const threadFilter = criteria.filters?.find(x => x.get('field') === 'threadId')

      if (!threadFilter) return res.status(400).send()

      const query = new FindThreadByIdQuery(threadFilter.get('value') as string)

      const thread = (await this.queryBus.ask<ThreadResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(thread.spaceId)

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

      if (thread.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) return res.status(401).send()

        const threadUser = await this.getThreadUser(spaceMember.userId, thread.id)
        if (!threadUser) return res.status(401).send()
      }

      const likeQuery = new FindLikesByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const threads = (await this.queryBus.ask<LikeCollectionResponse>(likeQuery)).response

      return res.status(200).json(threads)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThreadNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async getThreadUser (userId: string, threadId: string) {
    const query = new FindThreadUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'threadId'],
        ['operator', '='],
        ['value', threadId]
      ])
    ])

    const user = (await this.queryBus.ask<ThreadUserCollectionResponse>(query)).response.pop()

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
