import { Level } from '../domain/Level'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { LevelResponse, LevelResponseBody } from './LevelResponse'

export class LevelCollectionResponse implements QueryResponse<Array<LevelResponseBody>> {
  response: Array<LevelResponseBody>

  constructor (level: Array<Level>) {
    this.response = level.map(x => new LevelResponse(x).response)
  }
}
