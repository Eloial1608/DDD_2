import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

type ResponseBody = {
  readonly id: string
  readonly name: string
  readonly username: string
  readonly email: string
  readonly isAdmin: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UsersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

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
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private buildResponse (users: UserCollectionResponse): ResponseBody[] {
    return users.response.map(x => ({
      id: x.id,
      name: x.name,
      username: x.username,
      email: x.email,
      isAdmin: x.isAdmin,
      createdAt: x.createdAt,
      updatedAt: x.updatedAt
    }))
  }
}
