import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface CreditCardPaymentPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    cardId: string
    amount: number
    description?: string
  }
}