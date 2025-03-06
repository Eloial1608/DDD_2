import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { SectionCollectionResponse } from '@Course/Section/application/SectionCollectionResponse'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { FindSectionsByCriteriaQuery } from '@Course/Section/application/FindByCriteria/FindSectionsByCriteriaQuery'

export class SectionsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const sectionQuery = new FindSectionsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const sections = (await this.queryBus.ask<SectionCollectionResponse>(sectionQuery)).response

      return res.status(200).json(sections)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CourseNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
