import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface TransferPayload extends ProcessBankOperationDto {
  payload: {
    operationId: string
    originAccountId: string
    destinationAccountId: string
    amount: number
    description?: string
  }
}