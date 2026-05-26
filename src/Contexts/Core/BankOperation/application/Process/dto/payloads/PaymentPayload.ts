import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface PaymentPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    cardId: string
    amount: number
    description?: string
  }
}