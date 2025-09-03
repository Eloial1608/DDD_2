import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindSpaceUserTitleByIdQuery } from './FindSpaceUserTitleByIdQuery'
import { SpaceUserTitleResponse } from '../SpaceUserTitleResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'

export class FindSpaceUserTitleByIdQueryHandler implements QueryHandler<FindSpaceUserTitleByIdQuery, SpaceUserTitleResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindSpaceUserTitleByIdQuery
  }

  async handle (data: FindSpaceUserTitleByIdQuery): Promise<SpaceUserTitleResponse> {
    return new SpaceUserTitleResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
