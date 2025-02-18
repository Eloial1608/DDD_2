import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCourseByCriteriaQuery } from './FindCourseByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CourseCollectionResponse } from '../CourseCollectionResponse'

export class FindCourseByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCourseByCriteriaQuery, CourseCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCourseByCriteriaQuery
  }

  async handle (data: FindCourseByCriteriaQuery): Promise<CourseCollectionResponse> {
    return new CourseCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
