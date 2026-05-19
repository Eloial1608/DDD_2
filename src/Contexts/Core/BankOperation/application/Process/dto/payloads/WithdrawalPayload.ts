import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface WithdrawalPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    atmId?: string
    amount: number
    description?: string
  }
}