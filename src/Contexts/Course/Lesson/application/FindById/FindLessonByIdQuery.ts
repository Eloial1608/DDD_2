import { Query } from '@Shared/domain/QueryBus/Query'

export class FindLessonByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
