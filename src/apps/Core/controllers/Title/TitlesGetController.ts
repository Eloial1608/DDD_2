import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindTitlesByCriteriaQuery } from '@Core/Title/application/FindByCriteria/FindTitlesByCriteriaQuery'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { TitleCollectionResponse } from '@Core/Title/application/TitleCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'

export class TitlesGetController implements Controller {
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

      const query = new FindTitlesByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const titles = (await this.queryBus.ask<TitleCollectionResponse>(query)).response

      return res.status(200).json(titles)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())
      if (e instanceof TitleNotFound) res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
