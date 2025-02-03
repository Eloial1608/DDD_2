import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { Nullable } from '@Shared/domain/Nullable'

type ResponseBody = {
  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly hasPayed: boolean
  readonly planId: Nullable<string>
  readonly hasCompletedRegister: boolean
  readonly totalPosts: number
  readonly totalMedia: number
  readonly pictureUrl: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly totalThreads: number
  readonly isBanned: boolean
  readonly totalThreadResponses: number
  readonly communityId: string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UsersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const communityId = criteria.filters?.find(x => x.get('field') === 'communityId')?.get('value')

      if (!communityId) return res.status(400).send()

      const communityQuery = new FindCommunityByIdQuery(communityId as string)

      const community = await (await this.queryBus.ask<CommunityResponse>(communityQuery)).response

      if (community.isPrivate) {
        if (!req.headers.authorization) return res.status(401).send()

        const data = await this.decoder.run(req.headers.authorization)

        if ((community.mainId ?? community.id) !== data.communityId) return res.status(401).send()
      }

      const query = new FindUsersByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const users = (await this.queryBus.ask<UserCollectionResponse>(query))

      return res.status(200).json(this.buildResponse(users))
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private buildResponse (users: UserCollectionResponse): ResponseBody[] {
    return users.response.map(x => {
      const { email, about, registerData, ...data } = x

      return data
    })
  }
}
