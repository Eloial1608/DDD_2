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

export class PostsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  private user: Nullable<UserResponseBody>

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
        if (p) postsToSend.push(p)
      }

      return res.status(200).json({ posts: postsToSend })
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof PostNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterPost (post: PostResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(post.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (this.user === undefined) {
        if (!token) return null

        const data = await this.decoder.run(token)

        const user = await this.getUser(data.id, post.communityId)

        this.user = user ?? null
      }

      if (!this.user) return null

      if (!this.user.isAdmin && !this.user.isOwner) {
        const spaceMember = await this.getSpaceMember(this.user.id, this.user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    return space
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

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
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
