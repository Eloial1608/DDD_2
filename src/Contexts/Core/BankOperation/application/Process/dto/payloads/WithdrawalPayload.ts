import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface WithdrawalPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    atmId?: string
    amount: number
    description?: string
  }
}