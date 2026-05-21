import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { TransferPayload } from "../dto/payloads/TransferPayload"
import { FindAcountByIdQuery } from "@Core/Account/application/FindById/FindAccountByIdQuery"
import { AccountResponse } from "@Core/Account/application/AccountResponse"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { UpdateAccountBalanceCommand } from "src/Contexts/Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"

export class TransferStrategy
  implements OperationStrategy<TransferPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: TransferPayload["payload"]
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
        payload.amount,
        AccountMovementTypeEnum.TRANSFER,
        payload.description ?? "Transfer sent",
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
        payload.amount,
        AccountMovementTypeEnum.TRANSFER,
        payload.description ?? "Transfer received",
        payload.originAccountId
      )
    )

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        payload.destinationAccountId,
        originBankAccount.response.balance + payload.amount
      )
    )
  }
}