import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindFormByIdQuery } from './FindFormByIdQuery'
import { FormResponse } from '../FormResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/Form/domain/ValueObjects/Id'

export class FindFormByIdQueryHandler implements QueryHandler<FindFormByIdQuery, FormResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindFormByIdQuery
  }

  async handle (data: FindFormByIdQuery): Promise<FormResponse> {
    return new FormResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
