import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCalendarByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
