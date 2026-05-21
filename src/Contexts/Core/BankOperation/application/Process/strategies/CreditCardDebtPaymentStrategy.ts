import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { CardResponse } from "@Core/Card/application/CardResponse"
import { FindCardByIdQuery } from "@Core/Card/application/FindById/FindCardByIdQuery"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { CreditCardDebtPaymentPayload } from "../dto/payloads/CreditCardDebtPaymentPayload"
import { FindAcountByIdQuery } from "@Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "@Core/Account/application/AccountResponse"
import { UpdateAccountBalanceCommand } from "@Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { UpdateBalanceCommand } from "@Core/Card/application/UpdateBalance/UpdateBalanceCommand"
import { CreateCardMovementCommand } from "@Core/CardMovement/application/Create/CreateCardMovementCommand"

export class CreditCardDebtPaymentStrategy
  implements OperationStrategy<CreditCardDebtPaymentPayload["payload"]> {
    constructor(
      private readonly commandBus: CommandBus,
      private readonly queryBus: QueryBus
    ) {}

  async execute(
    payload: CreditCardDebtPaymentPayload["payload"]
    
  ): Promise<void> {

      const originQuery = new FindCardByIdQuery(payload.cardId)
      const creditCard = await this.queryBus.ask<CardResponse>(originQuery)
      const cardDiference = creditCard.response.limitCard - creditCard.response.balance
      const accountQuery = new FindAcountByIdQuery(payload.accountId)
      const bankAccount = await this.queryBus.ask<AccountResponse>(accountQuery)
      
      if (bankAccount.response.balance < cardDiference) {
        throw new Error("Insuficient funds")
      }

      const accountMovementId = crypto.randomUUID()

      await this.commandBus.dispatch(
          new AccountMovementCommand(
            accountMovementId,
            payload.operationId,
            payload.accountId,
            -cardDiference,
            AccountMovementTypeEnum.CREDIT_CARD_PAYMENT,
            payload.description ?? "Credit card debt payment",
            undefined,
            payload.cardId
          )
        )
    
        await this.commandBus.dispatch(
          new UpdateAccountBalanceCommand(
            bankAccount.response.id,
            bankAccount.response.balance - cardDiference
          )
        )

      await this.commandBus.dispatch(
          new CreateCardMovementCommand(
            crypto.randomUUID(),
            payload.operationId,
            payload.cardId,
            cardDiference,
            payload.description ?? "Credit card debt payment",
            accountMovementId
          )
        )
  
      await this.commandBus.dispatch(
        new UpdateBalanceCommand(
          creditCard.response.id,
          creditCard.response.balance + cardDiference
        )
      )
  }
}