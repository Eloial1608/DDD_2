import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindProjectUsersByCriteriaQuery } from './FindProjectUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { ProjectUserCollectionResponse } from '../ProjectUserCollectionResponse'

export class FindProjectUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindProjectUsersByCriteriaQuery, ProjectUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindProjectUsersByCriteriaQuery
  }

  async handle (data: FindProjectUsersByCriteriaQuery): Promise<ProjectUserCollectionResponse> {
    return new ProjectUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
