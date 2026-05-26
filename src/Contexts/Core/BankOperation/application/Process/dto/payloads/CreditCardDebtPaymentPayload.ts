import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface CreditCardDebtPaymentPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    cardId: string
    description?: string
  }
}