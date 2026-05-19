import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { DepositPayload } from "../dto/payloads/DepositPayload"

export class DepositStrategy
  implements OperationStrategy<DepositPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: DepositPayload["payload"]
  ): Promise<void> {
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
  }
}