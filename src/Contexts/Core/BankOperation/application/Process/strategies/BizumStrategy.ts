import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { BizumPayload } from "../dto/payloads/BizumPayload"
import { UpdateAccountBalanceCommand } from "src/Contexts/Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { FindAcountByIdQuery } from "src/Contexts/Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "src/Contexts/Core/Account/application/AccountResponse"
import { QueryBus } from "src/Contexts/Shared/domain/QueryBus/QueryBus"

export class BizumStrategy
  implements OperationStrategy<BizumPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: BizumPayload["payload"]
  ): Promise<void> {
    const originQuery = new FindAcountByIdQuery(payload.originAccountId)
    const originBankAccount = await this.queryBus.ask<AccountResponse>(originQuery)

    if (originBankAccount.response.balance < payload.amount) {
      throw new Error("Insufficient funds")
    }

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.originAccountId,
        -payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum sent",
        payload.destinationAccountId
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
        payload.operationId,
        payload.destinationAccountId,
        -payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum received",
        payload.originAccountId
      )
    )

    const destinationQuery = new FindAcountByIdQuery(payload.destinationAccountId)
    const destinationBankAccount = await this.queryBus.ask<AccountResponse>(destinationQuery)

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand( 
        destinationBankAccount.response.id,
        destinationBankAccount.response.balance + payload.amount
      )
    )
    console.log("Destination account movement created")
  }
}