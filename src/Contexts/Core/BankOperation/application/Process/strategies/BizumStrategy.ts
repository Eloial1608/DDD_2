import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { BizumPayload } from "../dto/payloads/BizumPayload"

export class BizumStrategy
  implements OperationStrategy<BizumPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: BizumPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.originAccountId,
        payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum sent",
        payload.destinationAccountId
      )
    )

    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.destinationAccountId,
        payload.amount,
        AccountMovementTypeEnum.BIZUM,
        payload.description ?? "Bizum received",
        payload.originAccountId
      )
    )
  }
}