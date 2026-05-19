import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface CreditCardPaymentPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    cardId: string
    amount: number
    description?: string
  }
}