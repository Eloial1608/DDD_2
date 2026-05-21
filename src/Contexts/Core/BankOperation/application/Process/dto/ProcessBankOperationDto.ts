export interface ProcessBankOperationDto {
  type: string
  payload: {
    operationId: string
    description?: string
  }
}
