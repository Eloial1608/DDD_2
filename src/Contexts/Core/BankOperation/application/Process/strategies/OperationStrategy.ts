export interface OperationStrategy<TPayload = unknown> {
  execute(payload: TPayload): Promise<void>
}