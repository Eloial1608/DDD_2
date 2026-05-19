import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { WithdrawalPayload } from "../dto/payloads/WithdrawalPayload"

export class WithdrawalStrategy
  implements OperationStrategy<WithdrawalPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: WithdrawalPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.WITHDRAWAL,
        payload.description ?? "Withdrawal"
      )
    )
  }
}