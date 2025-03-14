import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCourseUsersByCriteriaQuery } from './FindCourseUsersByCriteriaQuery'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { CourseUserCollectionResponse } from '../CourseUserCollectionResponse'

export class FindCourseUsersByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindCourseUsersByCriteriaQuery, CourseUserCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindCourseUsersByCriteriaQuery
  }

  async handle (data: FindCourseUsersByCriteriaQuery): Promise<CourseUserCollectionResponse> {
    return new CourseUserCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
