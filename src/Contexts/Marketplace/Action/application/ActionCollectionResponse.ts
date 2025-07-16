import type { Action } from '../domain/Action'
import type { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { ActionResponse, type ActionResponseBody } from './ActionResponse'

export class ActionCollectionResponse implements QueryResponse<Array<ActionResponseBody>> {
  response: Array<ActionResponseBody>

  constructor (action: Array<Action>) {
    this.response = action.map(x => new ActionResponse(x).response)
  }
}
