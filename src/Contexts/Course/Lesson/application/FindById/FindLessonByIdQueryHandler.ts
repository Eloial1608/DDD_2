import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindLessonByIdQuery } from './FindLessonByIdQuery'
import { LessonResponse } from '../LessonResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'

export class FindLessonByIdQueryHandler implements QueryHandler<FindLessonByIdQuery, LessonResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindLessonByIdQuery
  }

  async handle (data: FindLessonByIdQuery): Promise<LessonResponse> {
    return new LessonResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
