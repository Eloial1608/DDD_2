import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindCommunityByIdQuery } from './FindCommunityByIdQuery'
import { CommunityResponse } from '../CommunityResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Metrics/Community/domain/ValueObjects/Id'

export class FindCommunityByIdQueryHandler implements QueryHandler<FindCommunityByIdQuery, CommunityResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindCommunityByIdQuery
  }

  async handle (data: FindCommunityByIdQuery): Promise<CommunityResponse> {
    return new CommunityResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
