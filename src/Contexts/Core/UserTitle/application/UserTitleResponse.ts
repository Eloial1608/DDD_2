import { UserTitle } from '../domain/UserTitle'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserTitleResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly titleId: string
    readonly userId: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class UserTitleResponse implements QueryResponse<UserTitleResponseBody> {
  response: UserTitleResponseBody

  constructor (userTitle: UserTitle) {
    this.response = {
      id: userTitle.id.valueOf(),
      titleId: userTitle.titleId.valueOf(),
      userId: userTitle.userId.valueOf(),
      communityId: userTitle.communityId.valueOf(),
      createdAt: userTitle.createdAt.valueOf(),
      updatedAt: userTitle.updatedAt.valueOf()
    }
  }
}
