import { Space } from '../domain/Space'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { SpaceResponse, SpaceResponseBody } from './SpaceResponse'

export class SpaceCollectionResponse implements QueryResponse<Array<SpaceResponseBody>> {
  response: Array<SpaceResponseBody>

  constructor (space: Array<Space>) {
    this.response = space.map(x => new SpaceResponse(x).response)
  }
}
