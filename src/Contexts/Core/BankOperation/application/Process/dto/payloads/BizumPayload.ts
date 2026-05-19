import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface BizumPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    originAccountId: string
    destinationAccountId: string
    phone: string
    amount: number
    description?: string
  }
}