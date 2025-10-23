import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindProjectsByCriteriaQuery } from './FindProjectsByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ProjectCollectionResponse } from '../ProjectCollectionResponse'

export class FindProjectsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindProjectsByCriteriaQuery, ProjectCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindProjectsByCriteriaQuery
  }

  async handle (data: FindProjectsByCriteriaQuery): Promise<ProjectCollectionResponse> {
    return new ProjectCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
