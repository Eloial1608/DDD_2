import { Nullable } from '@Shared/domain/Nullable'
import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserResponseBody = {
    readonly id: string
    readonly mainId: string
    readonly name: string
    readonly username: string
    readonly pictureUrl: Nullable<string>
    readonly bannerUrl: Nullable<string>
    readonly isAdmin: boolean
    readonly isOwner: boolean
    readonly communityId: string
}

export class UserResponse implements QueryResponse<UserResponseBody> {
  response: UserResponseBody

  constructor (user: User) {
    this.response = {
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      name: user.name.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      isOwner: user.isOwner.valueOf(),
      pictureUrl: user.pictureUrl?.valueOf(),
      bannerUrl: user.bannerUrl?.valueOf(),
      username: user.username.valueOf(),
      communityId: user.communityId.valueOf()
    }
  }
}
