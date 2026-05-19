import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { RefundPayload } from "../dto/payloads/RefundPayload"

export class RefundStrategy
  implements OperationStrategy<RefundPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: RefundPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.originAccountId,
        payload.amount,
        AccountMovementTypeEnum.REFUND,
        payload.description ?? "Refund debit",
        payload.destinationAccountId
      )
    )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.destinationAccountId,
        payload.amount,
        AccountMovementTypeEnum.REFUND,
        payload.description ?? "Refund credit",
        payload.originAccountId
      )
    )
  }
}