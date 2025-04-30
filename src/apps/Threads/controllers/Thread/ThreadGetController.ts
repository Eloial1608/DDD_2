import { Nullable } from '@Shared/domain/Nullable'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { Response, Request } from 'express'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse, ThreadResponseBody } from '@Threads/Thread/application/ThreadResponse'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { SpaceMemberResponseBody } from '@Threads/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Threads/User/application/UserResponse'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Threads/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { LikeCollectionResponse } from '@Threads/Like/application/LikeCollectionResponse'
import { FindLikesByCriteriaQuery } from '@Threads/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { ThreadUserCollectionResponse } from '@Threads/ThreadUser/application/ThreadUserCollectionResponse'
import { FindThreadUsersByCriteriaQuery } from '@Threads/ThreadUser/application/FindByCriteria/FindThreadUsersByCriteriaQuery'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'

type ThreadsGetControllerResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: Nullable<string>
  readonly parentThreadId: Nullable<string>
  readonly mainThreadId: Nullable<string>
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
  totalLikes: number
  readonly isLocked?: boolean
  totalThreads: number
  readonly price: Nullable<{value: number, currency: string}>
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class ThreadGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindThreadByIdQuery(req.params.id)

      const thread = (await this.queryBus.ask<ThreadResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(thread.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, thread.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (thread.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) {
          return res.status(200).json(await this.buildResponse(this.getThreadWithoutContent(thread), user?.id))
        }
        const threadUser = await this.getThreadUser(spaceMember.userId, thread.id)
        if (!threadUser) {
          return res.status(200).json(await this.buildResponse(this.getThreadWithoutContent(thread), user?.id))
        }
      }

      return res.status(200).json(await this.buildResponse(thread, user?.id))
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThreadNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private getThreadWithoutContent (thread: ThreadResponseBody) {
    const { content, ...data } = thread

    return {
      ...data,
      isLocked: true
    }
  }

  private async buildResponse (thread: Partial<ThreadsGetControllerResponseBody>, userId?: string) : Promise<ThreadsGetControllerResponseBody> {
    return {
      ...thread as ThreadsGetControllerResponseBody,
      likeId: userId ? (await this.getLikeId(userId, thread.id!))?.id : undefined
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
}
