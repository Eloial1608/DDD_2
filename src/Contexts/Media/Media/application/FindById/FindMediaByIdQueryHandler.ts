import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindMediaByIdQuery } from './FindMediaByIdQuery'
import { MediaResponse } from '../MediaResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Media/Media/domain/ValueObjects/Id'

export class FindMediaByIdQueryHandler implements QueryHandler<FindMediaByIdQuery, MediaResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindMediaByIdQuery
  }

  async handle (data: FindMediaByIdQuery): Promise<MediaResponse> {
    return new MediaResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
