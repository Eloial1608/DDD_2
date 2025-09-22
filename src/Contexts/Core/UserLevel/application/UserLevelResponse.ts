import { UserLevel } from '../domain/UserLevel'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserLevelResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly currentExp: number
    readonly createdAt: Date
}

export class UserLevelResponse implements QueryResponse<UserLevelResponseBody> {
  response: UserLevelResponseBody

  constructor (level: UserLevel) {
    this.response = {
      id: level.id.valueOf(),
      communityId: level.communityId.valueOf(),
      userId: level.userId.valueOf(),
      currentExp: level.currentExp.valueOf(),
      createdAt: level.createdAt.valueOf()
    }
  }
}
