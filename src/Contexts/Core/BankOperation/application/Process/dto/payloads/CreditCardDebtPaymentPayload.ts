import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface CreditCardDebtPaymentPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    cardId: string
    description?: string
  }
}