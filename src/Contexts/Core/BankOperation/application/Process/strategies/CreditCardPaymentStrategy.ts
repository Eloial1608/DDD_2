import { CommandBus } from "@Shared/domain/CommandBus/CommandBus"
import { AccountMovementCommand } from "@Core/AccountMovement/application/Create/AccountMovementCommand"
import { AccountMovementTypeEnum } from "@Core/AccountMovement/domain/ValueObjects/AccountMovementType"
import { OperationStrategy } from "./OperationStrategy"
import { CreditCardPaymentPayload } from "../dto/payloads/CreditCardPaymentPayload"

export class CreditCardPaymentStrategy
  implements OperationStrategy<CreditCardPaymentPayload["payload"]> {

  constructor(
    private readonly commandBus: CommandBus
  ) {}

  async execute(
    payload: CreditCardPaymentPayload["payload"]
  ): Promise<void> {
    await this.commandBus.dispatch(
      new AccountMovementCommand(
        crypto.randomUUID(),
        payload.operationId,
        payload.accountId,
        payload.amount,
        AccountMovementTypeEnum.CREDIT_CARD_PAYMENT,
        payload.description ?? "Credit card payment",
        undefined,
        payload.cardId
      )
    )
  }
}