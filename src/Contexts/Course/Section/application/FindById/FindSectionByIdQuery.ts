import { Query } from '@Shared/domain/QueryBus/Query'

export class FindSectionByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}