import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserByEmailQuery implements Query {
  constructor (
    readonly email: string
  ) {}
}