import { Space } from '../domain/Space'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceResponseBody = {
    readonly id: string
    readonly type: string
    readonly communityId: string
}

export class SpaceResponse implements QueryResponse<SpaceResponseBody> {
  response: SpaceResponseBody

  constructor (space: Space) {
    this.response = {
      id: space.id.valueOf(),
      type: space.type.valueOf(),
      communityId: space.communityId.valueOf()
    }
  }
}
