import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FinderByCriteria } from './FinderByCriteria'
import { Query } from '@Shared/domain/QueryBus/Query'
import { CriteriaHandler } from '@Shared/domain/Criteria/CriteriaHandler'
import { LessonCollectionResponse } from '../LessonCollectionResponse'
import { FindLessonsByCriteriaQuery } from './FindLessonsByCriteriaQuery'

export class FindLessonsByCriteriaQueryHandler extends CriteriaHandler implements QueryHandler<FindLessonsByCriteriaQuery, LessonCollectionResponse> {
  constructor (private readonly finder: FinderByCriteria) {
    super()
  }

  subscribedTo (): Query {
    return FindLessonsByCriteriaQuery
  }

  async handle (data: FindLessonsByCriteriaQuery): Promise<LessonCollectionResponse> {
    return new LessonCollectionResponse(
      await this.finder.find(this.buildCriteria(data))
    )
  }
}
