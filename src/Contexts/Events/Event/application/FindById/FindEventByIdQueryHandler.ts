import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindEventByIdQuery } from './FindEventByIdQuery'
import { EventResponse } from '../EventResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Events/Event/domain/ValueObjects/Id'

export class FindEventByIdQueryHandler implements QueryHandler<FindEventByIdQuery, EventResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindEventByIdQuery
  }

  async handle (data: FindEventByIdQuery): Promise<EventResponse> {
    return new EventResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
