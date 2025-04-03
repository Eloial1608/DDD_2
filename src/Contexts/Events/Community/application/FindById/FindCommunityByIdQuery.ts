import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCommunityByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
