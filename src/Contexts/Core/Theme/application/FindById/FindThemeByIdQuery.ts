import { Query } from '@Shared/domain/QueryBus/Query'

export class FindThemeByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
