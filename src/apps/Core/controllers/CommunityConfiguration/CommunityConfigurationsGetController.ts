import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityConfigurationNotFound } from '@Core/CommunityConfiguration/domain/Errors/CommunityConfigurationNotFound'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { CommunityConfigurationCollectionResponse } from '@Core/CommunityConfiguration/application/CommunityConfigurationCollectionResponse'
import { FindCommunityConfigurationByCriteriaQuery } from '@Core/CommunityConfiguration/application/FindByCriteria/FindCommunityConfigurationByCriteriaQuery'

export class CommunityConfigurationsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindCommunityConfigurationByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const communityconfigurations = (await this.queryBus.ask<CommunityConfigurationCollectionResponse>(query)).response

      return res.status(200).json(communityconfigurations)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CommunityConfigurationNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
