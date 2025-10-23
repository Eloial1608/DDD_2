import { Query } from '@Shared/domain/QueryBus/Query'

export class FindCommunityConfigurationByIdQuery implements Query {
  constructor (
        readonly id: string
  ) {}
}
