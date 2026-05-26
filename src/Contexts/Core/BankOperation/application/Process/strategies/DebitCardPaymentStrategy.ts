import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { DebitCardPaymentPayload } from "../dto/payloads/DebitCardPaymentPayload"
import { FindAcountByIdQuery } from "@Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "@Core/Account/application/AccountResponse"
import { CreateCardMovementCommand } from "@Core/CardMovement/application/Create/CreateCardMovementCommand"
import { UpdateAccountBalanceCommand } from "@Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { QueryBus } from "src/Contexts/Shared/domain/QueryBus/QueryBus"
import { FindCardByIdQuery } from "@Core/Card/application/FindById/FindCardByIdQuery"
import { CardResponse } from "@Core/Card/application/CardResponse"
import { CardBlocked } from "@Core/Card/domain/Errors/CardBlocked"
import { Id } from "@Core/Card/domain/ValueObjects/Id"

export class DebitCardPaymentStrategy
  implements OperationStrategy<DebitCardPaymentPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: DebitCardPaymentPayload["payload"]
  ): Promise<void> {
    const cardQuery = new FindCardByIdQuery(payload.cardId)
    const card = await this.queryBus.ask<CardResponse>(cardQuery)

    if (card.response.isBlocked) {
      throw new CardBlocked(new Id(payload.cardId))
    }

    const originQuery = new FindAcountByIdQuery(payload.originAccountId)
    const originBankAccount = await this.queryBus.ask<AccountResponse>(originQuery)

    if (originBankAccount.response.balance < payload.amount) {
      throw new Error("Insufficient funds")
    }

    const accountMovementId = crypto.randomUUID()
    const operationId = crypto.randomUUID()

    await this.commandBus.dispatch(
      new CreateCardMovementCommand(
        crypto.randomUUID(),
        operationId,
        payload.cardId,
        -payload.amount,
        payload.description ?? "Debit card payment",
        accountMovementId,
      )
    )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        accountMovementId,
        operationId,
        payload.originAccountId,
        -payload.amount,
        AccountMovementTypeEnum.PAYMENT,
        payload.description ?? "Debit card payment",
        payload.relatedAccountId,
        payload.cardId
      )
    )

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        originBankAccount.response.id,
        originBankAccount.response.balance - payload.amount
       )
     )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        operationId,
        payload.relatedAccountId,
        payload.amount,
        AccountMovementTypeEnum.PAYMENT,
        payload.description ?? "Debit card payment received",
        payload.originAccountId,
        payload.cardId
       )
     )

     await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        payload.relatedAccountId,
        originBankAccount.response.balance + payload.amount
       )
      )
  }
}