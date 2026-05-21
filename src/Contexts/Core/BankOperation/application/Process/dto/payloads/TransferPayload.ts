import { ProcessBankOperationDto } from "../ProcessBankOperationDto"

export interface TransferPayload extends ProcessBankOperationDto {
  payload: {
    originAccountId: string
    destinationAccountId: string
    amount: number
    description?: string
  }
}