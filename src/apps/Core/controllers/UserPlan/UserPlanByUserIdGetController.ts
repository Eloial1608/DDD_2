import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUserPlansByCriteriaQuery } from '@Core/UserPlan/application/FindByCriteria/FindUserPlansByCriteriaQuery'
import { UserPlanCollectionResponse } from '@Core/UserPlan/application/UserPlanCollectionResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'

export class UserPlanByUserIdGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = this.decoder.run(req.headers.authorization)

      const userQuery = new FindUserByIdQuery(req.params.id)

      const user = (await this.queryBus.ask<UserResponse>(userQuery)).response

      if (!user) return res.status(404).send()

      if ((!user.isAdmin && !user.isOwner) && user.mainId !== data.id) return res.status(401).send()

      const userPlan = await this.getUserPlan(user.id)

      if (!userPlan) return res.status(404).send()

      return res.status(200).json(userPlan)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async getUserPlan (userId: string) {
    const query = new FindUserPlansByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', userId]
      ])
    ])

    return (await this.queryBus.ask<UserPlanCollectionResponse>(query)).response.pop()
  }
}
