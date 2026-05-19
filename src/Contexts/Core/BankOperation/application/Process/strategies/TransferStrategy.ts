import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { TransferPayload } from "../dto/payloads/TransferPayload"

export class TransferStrategy
  implements OperationStrategy<TransferPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: TransferPayload["payload"]
  ): Promise<void> {
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
  }
}