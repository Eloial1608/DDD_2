import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindCommunityByIdQuery } from '@Events/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Events/Community/application/CommunityResponse'
import { CommunityNotFound } from '@Events/Community/domain/Errors/CommunityNotFound'

export class CommunityByIdGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id

      const query = new FindCommunityByIdQuery(id)

      const response = await this.queryBus.ask<CommunityResponse>(query)

      return res.status(200).json(response.response)
    } catch (e) {
      if (e instanceof CommunityNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
