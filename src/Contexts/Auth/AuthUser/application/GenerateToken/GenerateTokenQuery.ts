import { Query } from '@Shared/domain/QueryBus/Query'

export class GenerateTokenQuery implements Query {
  constructor (
        readonly email: string,
        readonly communityId: string,
        readonly method: string,
        readonly secret: string
  ) {}
}
