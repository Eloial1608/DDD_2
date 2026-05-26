import { Query } from '@Shared/domain/QueryBus/Query'

export class FindUserByUsernameQuery implements Query {
  constructor (
        readonly username: string
  ) {}
}
