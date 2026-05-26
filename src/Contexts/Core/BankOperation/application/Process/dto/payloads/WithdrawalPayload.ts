import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface WithdrawalPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    amount: number
    description?: string
  }
}