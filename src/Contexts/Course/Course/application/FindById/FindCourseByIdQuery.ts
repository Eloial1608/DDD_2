import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCourseByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
