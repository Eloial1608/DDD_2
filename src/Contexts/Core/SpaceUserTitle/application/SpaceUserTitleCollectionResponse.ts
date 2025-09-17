import { SpaceUserTitle } from '../domain/SpaceUserTitle'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { SpaceUserTitleResponse, SpaceUserTitleResponseBody } from './SpaceUserTitleResponse'

export class SpaceUserTitleCollectionResponse implements QueryResponse<Array<SpaceUserTitleResponseBody>> {
  response: Array<SpaceUserTitleResponseBody>

  constructor (spaceUserTitle: Array<SpaceUserTitle>) {
    this.response = spaceUserTitle.map(x => new SpaceUserTitleResponse(x).response)
  }
}
