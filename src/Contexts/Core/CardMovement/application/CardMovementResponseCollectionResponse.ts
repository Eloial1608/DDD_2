import { CardMovement } from '../domain/CardMovement'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CardMovementResponse, CardMovementResponseBody } from './CardMovementResponse'

export class CardMovementCollectionResponse implements QueryResponse<Array<CardMovementResponseBody>> {

  readonly response: Array<CardMovementResponseBody>

  constructor(cardMovements: Array<CardMovement>) {
    this.response = cardMovements.map(
      x => new CardMovementResponse(x).response
    )
  }
}