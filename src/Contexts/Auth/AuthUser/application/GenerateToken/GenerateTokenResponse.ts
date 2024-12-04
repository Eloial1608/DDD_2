import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export class GenerateTokenResponse implements QueryResponse<string> {
  constructor (readonly response: string) {}
}
