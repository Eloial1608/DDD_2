import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommunityConfigurationByIdQuery } from './FindCommunityConfigurationByIdQuery'
import { CommunityConfigurationResponse } from '../CommunityConfigurationResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'

export class FindCommunityConfigurationByIdQueryHandler implements QueryHandler<FindCommunityConfigurationByIdQuery, CommunityConfigurationResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindCommunityConfigurationByIdQuery
  }

  async handle (data: FindCommunityConfigurationByIdQuery): Promise<CommunityConfigurationResponse> {
    return new CommunityConfigurationResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
