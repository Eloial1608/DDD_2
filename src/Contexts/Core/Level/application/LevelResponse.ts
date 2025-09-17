import { Level } from '../domain/Level'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type LevelResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly levelNumber: number
    readonly minimumExp: number
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class LevelResponse implements QueryResponse<LevelResponseBody> {
  response: LevelResponseBody

  constructor (level: Level) {
    this.response = {
      id: level.id.valueOf(),
      communityId: level.communityId.valueOf(),
      levelNumber: level.levelNumber.valueOf(),
      minimumExp: level.minimumExp.valueOf(),
      createdAt: level.createdAt.valueOf(),
      updatedAt: level.updatedAt.valueOf()
    }
  }
}
