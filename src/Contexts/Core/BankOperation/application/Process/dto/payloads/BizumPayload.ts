import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface BizumPayload extends ProcessBankOperationDto {
  payload: {
    originAccountId: string
    destinationAccountId: string
    phone: string
    amount: number
    description?: string
  }
}