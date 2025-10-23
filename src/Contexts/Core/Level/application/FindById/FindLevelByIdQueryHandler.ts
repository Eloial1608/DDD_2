import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindLevelByIdQuery } from './FindLevelByIdQuery'
import { LevelResponse } from '../LevelResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Level/domain/ValueObjects/Id'

export class FindLevelByIdQueryHandler implements QueryHandler<FindLevelByIdQuery, LevelResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindLevelByIdQuery
  }

  async handle (data: FindLevelByIdQuery): Promise<LevelResponse> {
    return new LevelResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
