import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { FindTicketByIdQuery } from './FindTicketByIdQuery'
import { TicketResponse } from '../TicketResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'

export class FindTicketByIdQueryHandler implements QueryHandler<FindTicketByIdQuery, TicketResponse> {
  constructor (private readonly finder: FinderById) {}

  subscribedTo (): Query {
    return FindTicketByIdQuery
  }

  async handle (data: FindTicketByIdQuery): Promise<TicketResponse> {
    return new TicketResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}
