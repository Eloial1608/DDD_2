import { Query } from '@Shared/domain/QueryBus/Query'

export class FindSpaceMemberQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
