import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { CreditCardPaymentPayload } from "../dto/payloads/CreditCardPaymentPayload"
import { CreateCardMovementCommand } from "@Core/CardMovement/application/Create/CreateCardMovementCommand"
import { FindCardByIdQuery } from "@Core/Card/application/FindById/FindCardByIdQuery"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { CardResponse } from "@Core/Card/application/CardResponse"
import { UpdateBalanceCommand } from "@Core/Card/application/UpdateBalance/UpdateBalanceCommand"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { UpdateAccountBalanceCommand } from "@Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"

export class CreditCardPaymentStrategy
  implements OperationStrategy<CreditCardPaymentPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: CreditCardPaymentPayload["payload"]
  ): Promise<void> {
    const originQuery = new FindCardByIdQuery(payload.cardId)
    const originCard = await this.queryBus.ask<CardResponse>(originQuery)

    if (originCard.response.balance < payload.amount) {
      throw new Error("Insufficient funds")
    }

    await this.commandBus.dispatch(
      new CreateCardMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.cardId,
        -payload.amount,
        payload.description ?? "Credit card payment",
        payload.accountId,
      )
    )

    await this.commandBus.dispatch(
      new UpdateBalanceCommand(
        payload.cardId,
        originCard.response.balance - payload.amount
      )
    )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.CREDIT_CARD_PAYMENT,
        payload.description ?? "Credit card payment received",
        undefined,
      )
    )

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        payload.cardId,
        originCard.response.balance + payload.amount
      )
     )
  }
}