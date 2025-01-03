import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Posts/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Posts/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse, PostResponseBody } from '@Posts/Post/application/PostResponse'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'
import { FindPostUsersByCriteriaQuery } from '@Posts/PostUser/application/FindByCriteria/FindPostUsersByCriteriaQuery'
import { PostUserCollectionResponse } from '@Posts/PostUser/application/PostUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Posts/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Posts/User/application/UserResponse'

export class PostGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindPostByIdQuery(req.params.id)

      const post = (await this.queryBus.ask<PostResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(post.spaceId)

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

      if (post.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) {
          return res.status(200).json({
            post: this.getPostWithoutContent(post)
          })
        }
        const postUser = await this.getPostUser(spaceMember.userId, post.id)
        if (!postUser) {
          return res.status(200).json({
            post: this.getPostWithoutContent(post)
          })
        }
      }

      return res.status(200).json(post)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof PostNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private getPostWithoutContent (post: PostResponseBody) {
    const { content, ...data } = post

    return data
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
