import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface DepositPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    accountId: string
    amount: number
    description?: string
  }
}