import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface RefundPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    originAccountId: string
    destinationAccountId: string
    amount: number
    description?: string
  }
}