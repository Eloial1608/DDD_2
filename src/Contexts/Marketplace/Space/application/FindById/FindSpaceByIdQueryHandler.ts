import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpaceByIdQuery } from './FindSpaceByIdQuery'
import { SpaceResponse } from '../SpaceResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Marketplace/Space/domain/ValueObjects/Id'

export class FindSpaceByIdQueryHandler implements QueryHandler<FindSpaceByIdQuery, SpaceResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindSpaceByIdQuery
  }

  async handle (data: FindSpaceByIdQuery): Promise<SpaceResponse> {
    return new SpaceResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
