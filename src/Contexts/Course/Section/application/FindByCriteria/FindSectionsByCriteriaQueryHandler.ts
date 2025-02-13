import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSectionsByCriteriaQuery } from './FindSectionsbyCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { SectionCollectionResponse } from '../SectionCollectionResponse'

export class FindSectionsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindSectionsByCriteriaQuery, SectionCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindSectionsByCriteriaQuery
  }

  async handle (data: FindSectionsByCriteriaQuery): Promise<SectionCollectionResponse> {
    return new SectionCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
