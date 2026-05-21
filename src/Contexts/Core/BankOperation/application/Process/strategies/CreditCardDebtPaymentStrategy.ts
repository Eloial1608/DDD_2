import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { CardResponse } from "src/Contexts/Core/Card/application/CardResponse"
import { FindCardByIdQuery } from "src/Contexts/Core/Card/application/FindById/FindCardByIdQuery"
import { QueryBus } from "src/Contexts/Shared/domain/QueryBus/QueryBus"
import { CreditCardDebtPaymentPayload } from "../dto/payloads/CreditCardDebtPaymentPayload"
import { FindAcountByIdQuery } from "src/Contexts/Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "src/Contexts/Core/Account/application/AccountResponse"
import { UpdateAccountBalanceCommand } from "src/Contexts/Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { UpdateAccountCardBalanceCommand } from "src/Contexts/Core/Card/application/UpdateAccountCardBalance/UpdateAccountCardBalanceCommand"
import { CreateCardMovementCommand } from "src/Contexts/Core/CardMovement/application/Create/CreateCardMovementCommand"

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

      console.log("Card difference: ", cardDiference)
      console.log("Account balance: ", bankAccount.response.balance)
      console.log("Card balance: ", creditCard.response.balance)
      console.log("Card limit: ", creditCard.response.limitCard)
      
      if (bankAccount.response.balance < cardDiference) {
        throw new Error("The card does not have enough balance to make the payment")
      }

      const accountMovementId = crypto.randomUUID()

      await this.commandBus.dispatch(
          new AccountMovementCommand(
            accountMovementId,
            payload.operationId,
            payload.accountId,
            -cardDiference,
            AccountMovementTypeEnum.CREDIT_CARD_PAYMENT,
            payload.description ?? "Credit card payment",
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
            payload.cardId,
            cardDiference,
            payload.description ?? "Credit card payment",
            accountMovementId
          )
        )
  
      await this.commandBus.dispatch(
        new UpdateAccountCardBalanceCommand(
          creditCard.response.id,
          creditCard.response.balance + cardDiference
        )
      )
  }
}