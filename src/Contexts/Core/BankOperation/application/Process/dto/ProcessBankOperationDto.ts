export interface ProcessBankOperationDto {
  type: string
  payload: {
    operationId: string
    amount: number
    description?: string
    [key: string]: unknown
  }
}

export interface ProcessBankOperationDto {
  operationId: string
  amount: number
  description?: string
}