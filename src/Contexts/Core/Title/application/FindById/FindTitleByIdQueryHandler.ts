import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTitleByIdQuery } from './FindTitleByIdQuery'
import { TitleResponse } from '../TitleResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Title/domain/ValueObjects/Id'

export class FindTitleByIdQueryHandler implements QueryHandler<FindTitleByIdQuery, TitleResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindTitleByIdQuery
  }

  async handle (data: FindTitleByIdQuery): Promise<TitleResponse> {
    return new TitleResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
