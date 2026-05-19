import { QueryHandler } from '@Shared/domain/QueryBus/QueryHandler'
import { CardMovementResponse } from '../CardMovementResponse'
import { FinderById } from './FinderById'
import { Query } from '@Shared/domain/QueryBus/Query'
import { Id } from '@Core/CardMovement/domain/ValueObjects/Id'

export class FindCardMovementByIdQueryHandler 
  implements QueryHandler<FindCardMovementByIdQueryHandler, CardMovementResponse> {

  constructor(private readonly finder: FinderById) {}

  subscribedTo(): Query {
    return FindCardMovementByIdQuery
  }

  async handle(data: FindCardMovementByIdQuery): Promise<CardMovementResponse> {
    return new CardMovementResponse(
      await this.finder.find(
        new Id(data.id)
      )
    )
  }
}