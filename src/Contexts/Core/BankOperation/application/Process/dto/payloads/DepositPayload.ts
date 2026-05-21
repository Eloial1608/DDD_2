import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface DepositPayload extends ProcessBankOperationDto {
  payload: {
    accountId: string
    amount: number
    description?: string
  }
}