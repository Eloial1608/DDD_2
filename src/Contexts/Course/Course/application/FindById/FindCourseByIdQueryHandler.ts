import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCourseByIdQuery } from './FindCourseByIdQuery'
import { CourseResponse } from '../CourseResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Course/Course/domain/ValueObjects/Id'

export class FindCourseByIdQueryHandler implements QueryHandler<FindCourseByIdQuery, CourseResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindCourseByIdQuery
  }

  async handle (data: FindCourseByIdQuery): Promise<CourseResponse> {
    return new CourseResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
