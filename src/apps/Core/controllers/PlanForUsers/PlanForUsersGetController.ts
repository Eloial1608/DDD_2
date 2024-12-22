import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { PlanForUsersNotFound } from '@Core/PlanForUsers/domain/Errors/PlanForUsersNotFound'
import { FindPlanForUsersQuery } from '@Core/PlanForUsers/application/Find/FindPlanForUsersQuery'
import { PlanForUsersResponse } from '@Core/PlanForUsers/application/PlanForUsersResponse'

export class PlanForUsersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindPlanForUsersQuery(req.params.id)

      const planForUsers = (await this.queryBus.ask<PlanForUsersResponse>(query)).response

      return res.status(200).json(planForUsers)
    } catch (e) {
      if (e instanceof PlanForUsersNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
