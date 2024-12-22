import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { FindPlanForUsersByCriteriaQuery } from '@Core/PlanForUsers/application/FindByCriteria/FindPlanForUsersByCriteriaQuery'
import { PlanForUsersCollectionResponse } from '@Core/PlanForUsers/application/PlanForUsersCollectionResponse'

export class PlansForUsersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindPlanForUsersByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const plansForUsers = (await this.queryBus.ask<PlanForUsersCollectionResponse>(query)).response

      return res.status(200).json(plansForUsers)
    } catch (e) {
      return res.status(500).send()
    }
  }
}
