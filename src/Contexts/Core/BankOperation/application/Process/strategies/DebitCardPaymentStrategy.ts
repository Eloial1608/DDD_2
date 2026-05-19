import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { DebitCardPaymentPayload } from "../dto/payloads/DebitCardPaymentPayload"

export class DebitCardPaymentStrategy
  implements OperationStrategy<DebitCardPaymentPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: DebitCardPaymentPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.PAYMENT,
        payload.description ?? "Debit card payment",
        undefined,
        payload.cardId
      )
    )
  }
}