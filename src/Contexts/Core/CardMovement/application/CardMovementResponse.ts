import { CardMovement } from '@Core/CardMovement/domain/CardMovement'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CardMovementResponseBody = {
  readonly id: string
  readonly cardId: string
  readonly amount: number
  readonly description: string | null
  readonly accountMovementId: string | null
  readonly createdAt: Date
}

export class CardMovementResponse implements QueryResponse<CardMovementResponseBody> {

  readonly response: CardMovementResponseBody

  constructor(cardMovement: CardMovement) {
    this.response = {
      id: cardMovement.id.valueOf(),

      cardId: cardMovement.cardId.valueOf(),

      amount: cardMovement.amount.valueOf(),

      description: cardMovement.description?.valueOf() ?? null,

      accountMovementId: cardMovement.accountMovementId?.valueOf() ?? null,

      createdAt: cardMovement.createdAt.valueOf()
    }
  }
}