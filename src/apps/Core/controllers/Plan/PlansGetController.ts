import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Controller } from '../@types/Controller'
import { Request, Response } from 'express'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { FindPlansByCriteriaQuery } from '@Core/Plan/application/FindByCriteria/FindPlansByCriteriaQuery'
import { PlanCollectionResponse } from '@Core/Plan/application/PlanCollectionResponse'

export class PlansGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    const criteria = buildCriteriaFromUri(req.query.criteria as string)

    const query = new FindPlansByCriteriaQuery(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)

    const response = (await this.queryBus.ask<PlanCollectionResponse>(query)).response

    return res.status(200).json(response)
  }
}
