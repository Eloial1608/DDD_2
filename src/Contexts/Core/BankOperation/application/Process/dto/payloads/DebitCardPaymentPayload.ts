import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface DebitCardPaymentPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    cardId: string
    amount: number
    description?: string
  }
}