import { Space } from '../domain/Space'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SpaceResponseBody = {
    readonly id: string
    readonly configuration: object
    readonly accessibility: string
    readonly type: string
    readonly communityId: string
}

export class SpaceResponse implements QueryResponse<SpaceResponseBody> {
  response: SpaceResponseBody

  constructor (space: Space) {
    this.response = {
      id: space.id.valueOf(),
      configuration: space.configuration.configuration,
      accessibility: space.accessibility.valueOf(),
      type: space.type.valueOf(),
      communityId: space.communityId.valueOf()
    }
  }
}
