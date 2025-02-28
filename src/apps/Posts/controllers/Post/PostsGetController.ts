import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Posts/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Posts/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { PostResponseBody } from '@Posts/Post/application/PostResponse'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'
import { FindPostsByCriteriaQuery } from '@Posts/Post/application/FindByCriteria/FindPostsByCriteriaQuery'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { PostCollectionResponse } from '@Posts/Post/application/PostCollectionResponse'
import { UserResponseBody } from '@Posts/User/application/UserResponse'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMemberResponseBody } from '@Posts/SpaceMember/application/SpaceMemberResponse'
import { FindPostUsersByCriteriaQuery } from '@Posts/PostUser/application/FindByCriteria/FindPostUsersByCriteriaQuery'
import { PostUserCollectionResponse } from '@Posts/PostUser/application/PostUserCollectionResponse'
import { FindLikesByCriteriaQuery } from '@Posts/Like/application/FindByCriteria/FindLikesByCriteriaQuery'
import { LikeCollectionResponse } from '@Posts/Like/application/LikeCollectionResponse'

type PostsGetControllerResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
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
  totalComments: number
  readonly price: Nullable<{value: number, currency: string}>
  readonly createdAt: Date
  readonly updatedAt: Date
}
export class PostsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindPostsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const posts = (await this.queryBus.ask<PostCollectionResponse>(query)).response

      const postsToSend = []

      for (const post of posts) {
        const p = await this.filterPost(post, req.headers.authorization as string)
        if (p) postsToSend.push(await this.buildResponse(post))
      }

      return res.status(200).json(posts)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof PostNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterPost (post: PostResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(post.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, post.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return null

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    if (post.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return this.getPostWithoutContent(post)
      const postUser = await this.getPostUser(spaceMember.userId, post.id)
      if (!postUser) return this.getPostWithoutContent(post)
    }

    return post
  }

  private getPostWithoutContent (post: PostResponseBody) {
    const { content, ...data } = post

    return {
      ...data,
      isLocked: true
    }
  }

  private async buildResponse (post: Partial<PostsGetControllerResponseBody>, mainId?: string) : Promise<PostsGetControllerResponseBody> {
    let user

    if (mainId) user = await this.getUser(mainId, post.communityId!)

    return {
      ...post as PostsGetControllerResponseBody,
      likeId: user ? (await this.getLikeId(user.id, post.id!))?.id : undefined
    }
  }

  private async getLikeId (userId: string, postId: string) {
    const query = new FindLikesByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'postId'],
        ['operator', '='],
        ['value', postId]
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

  private async getPostUser (userId: string, postId: string) {
    const query = new FindPostUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'postId'],
        ['operator', '='],
        ['value', postId]
      ])
    ])

    const user = (await this.queryBus.ask<PostUserCollectionResponse>(query)).response.pop()

    return user
  }
}
