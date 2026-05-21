import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { DepositPayload } from "../dto/payloads/DepositPayload"
import { UpdateAccountBalanceCommand } from "@Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand"
import { AccountResponse } from "@Core/Account/application/AccountResponse"
import { FindAcountByIdQuery } from "@Core/Account/application/FindById/FindAccountByIdQuery"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"

export class DepositStrategy
  implements OperationStrategy<DepositPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(
    payload: DepositPayload["payload"]
  ): Promise<void> {
    const query = new FindAcountByIdQuery(payload.accountId)
    const bankAccount = await this.queryBus.ask<AccountResponse>(query)

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.DEPOSIT,
        payload.description ?? "Deposit"
      )
    )

    await this.commandBus.dispatch(
      new UpdateAccountBalanceCommand(
        payload.accountId,
        bankAccount.response.balance + payload.amount
      )
    )
  }
}