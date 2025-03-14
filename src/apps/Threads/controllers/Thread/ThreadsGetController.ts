import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Threads/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { ThreadResponseBody } from '@Threads/Thread/application/ThreadResponse'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'
import { FindThreadsByCriteriaQuery } from '@Threads/Thread/application/FindByCriteria/FindThreadsByCriteriaQuery'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { ThreadCollectionResponse } from '@Threads/Thread/application/ThreadCollectionResponse'
import { UserResponseBody } from '@Threads/User/application/UserResponse'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMemberResponseBody } from '@Threads/SpaceMember/application/SpaceMemberResponse'
import { FindThreadUsersByCriteriaQuery } from '@Threads/ThreadUser/application/FindByCriteria/FindThreadUsersByCriteriaQuery'
import { ThreadUserCollectionResponse } from '@Threads/ThreadUser/application/ThreadUserCollectionResponse'
import { FindLikesByCriteriaQuery } from '@Threads/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { LikeCollectionResponse } from '@Threads/Like/application/LikeCollectionResponse'

type ThreadsGetControllerResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly parentThreadId: Nullable<string>
  readonly content: Nullable<string>
  readonly likeId: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly spaceId: string
  readonly author: {
    id: string
    mainId: string
    name: string
    username: string
    bannerUrl: Nullable<string>
    pictureUrl: Nullable<string>
  }
  readonly isPaid: boolean
  readonly isLocked?: boolean
  totalLikes: number
  totalThreads: number
  readonly price: Nullable<{value: number, currency: string}>
  readonly createdAt: Date
  readonly updatedAt: Date
}
export class ThreadsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindThreadsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const threads = (await this.queryBus.ask<ThreadCollectionResponse>(query)).response

      const threadsToSend = []

      for (const thread of threads) {
        const p = await this.filterThread(thread, req.headers.authorization as string)
        if (p) threadsToSend.push(await this.buildResponse(p))
      }

      return res.status(200).json(threadsToSend)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThreadNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterThread (thread: ThreadResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(thread.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, thread.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return null

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    if (thread.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return this.getThreadWithoutContent(thread)
      const threadUser = await this.getThreadUser(spaceMember.userId, thread.id)
      if (!threadUser) return this.getThreadWithoutContent(thread)
    }

    return thread
  }

  private getThreadWithoutContent (thread: ThreadResponseBody) {
    const { content, ...data } = thread

    return {
      ...data,
      isLocked: true
    }
  }

  private async buildResponse (thread: Partial<ThreadsGetControllerResponseBody>, mainId?: string) : Promise<ThreadsGetControllerResponseBody> {
    let user

    if (mainId) user = await this.getUser(mainId, thread.communityId!)

    return {
      ...thread as ThreadsGetControllerResponseBody,
      likeId: user ? (await this.getLikeId(user.id, thread.id!))?.id : undefined
    }
  }

  private async getLikeId (userId: string, threadId: string) {
    const query = new FindLikesByCriteriaQuery([
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
}
