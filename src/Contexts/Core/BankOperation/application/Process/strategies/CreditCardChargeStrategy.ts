import { OperationStrategy } from "./OperationStrategy"
import { CreditCardChargePayload } from "../dto/payloads/CreditCardChargePayload"

export class CreditCardChargeStrategy
  implements OperationStrategy<CreditCardChargePayload["payload"]> {

  async execute(
    payload: CreditCardChargePayload["payload"]
  ): Promise<void> {
    // pendent de definir exactament la regla de negoci
  }
}