import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface CreditCardChargePayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    cardId: string
    amount: number
    description?: string
  }
}