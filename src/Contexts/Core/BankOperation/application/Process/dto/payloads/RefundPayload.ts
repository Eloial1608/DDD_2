import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface RefundPayload extends ProcessBankOperationDto {
  payload: {
    originAccountId: string
    destinationAccountId: string
    amount: number
    description?: string
  }
}