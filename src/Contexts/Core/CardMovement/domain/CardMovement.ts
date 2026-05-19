import { AggregateRoot } from "@Shared/domain/AggregateRoot"
import { Nullable } from "@Shared/domain/Nullable"
import { CreatedAt } from "./ValueObjects/CreatedAt"
import { CardId } from "./ValueObjects/CardId"
import { CardMovementAmount } from "./ValueObjects/CardMovementAmount"
import { CardMovementDescription } from "./ValueObjects/CardMovementDescription"
import { CardMovementId } from "./ValueObjects/CardMovementId"

export class CardMovement extends AggregateRoot {
  constructor(
    readonly id: CardMovementId,
    readonly cardId: CardId,
    readonly amount: CardMovementAmount,
    readonly description: CardMovementDescription,
    readonly accountMovementId: CardMovementId | null,
    readonly createdAt: CreatedAt,
  ) {
    super()
  }

  static create(
    id: CardMovementId,
    cardId: CardId,
    amount: CardMovementAmount,
    description: Nullable<CardMovementDescription>,
    accountMovementId: Nullable<CardMovementId>,
  ): CardMovement {

    const now = new Date()

    return new CardMovement(
      id,
      cardId,
      amount,
      description ?? new CardMovementDescription(""),
      accountMovementId ?? null,
      new CreatedAt(now)
    )
  }
}