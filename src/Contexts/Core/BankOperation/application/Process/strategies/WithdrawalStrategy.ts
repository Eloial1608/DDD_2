import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { WithdrawalPayload } from "../dto/payloads/WithdrawalPayload"
import { AccountResponse } from "@Core/Account/application/AccountResponse"
import { FindAcountByIdQuery } from "@Core/Account/application/FindById/FindAccountByIdQuery"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"

export class WithdrawalStrategy
  implements OperationStrategy<WithdrawalPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: WithdrawalPayload["payload"]
  ): Promise<void> {
    const originQuery = new FindAcountByIdQuery(payload.accountId)
    const originBankAccount = await this.queryBus.ask<AccountResponse>(originQuery)

    if (originBankAccount.response.balance < payload.amount) {
      throw new Error("Insufficient funds")
    }
    const operationId = crypto.randomUUID()

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.WITHDRAWAL,
        payload.description ?? "Withdrawal"
      )
    )
  }
}