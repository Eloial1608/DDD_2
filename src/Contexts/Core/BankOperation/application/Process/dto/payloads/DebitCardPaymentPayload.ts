import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface DebitCardPaymentPayload extends ProcessBankOperationDto {
  payload: {
    originAccountId: string
    cardId: string
    relatedAccountId: string
    amount: number
    description?: string
  }
}