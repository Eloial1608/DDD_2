import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { PaymentPayload } from "../dto/payloads/PaymentPayload"

export class PaymentStrategy implements OperationStrategy<PaymentPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: PaymentPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.PAYMENT,
        payload.description ?? "Payment",
        undefined,
        payload.cardId
      )
    )
  }
}