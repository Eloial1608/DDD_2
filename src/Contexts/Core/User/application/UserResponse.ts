import { Nullable } from '@Shared/domain/Nullable'
import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserResponseBody = {
    readonly id: string
    readonly mainId: string
    readonly name: string
    readonly username: string
    readonly about: Nullable<string>
    readonly email:string
    readonly hasPayed: boolean
    readonly planId: Nullable<string>
    readonly hasCompletedRegister: boolean
    readonly registerData: Nullable<object>
    readonly isBanned: boolean
    readonly totalPosts: number
    readonly totalMedia: number
    readonly pictureUrl: Nullable<string>
    readonly bannerUrl: Nullable<string>
    readonly totalThreads: number
    readonly totalThreadResponses: number
    readonly communityId: string
    readonly isAdmin: boolean
    readonly isOwner: boolean
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class UserResponse implements QueryResponse<UserResponseBody> {
  response: UserResponseBody

  constructor (user: User) {
    this.response = {
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      name: user.name.valueOf(),
      username: user.username.valueOf(),
      about: user.about?.valueOf(),
      email: user.email.valueOf(),
      pictureUrl: user.pictureUrl?.valueOf(),
      bannerUrl: user.bannerUrl?.valueOf(),
      hasPayed: user.hasPayed.valueOf(),
      planId: user.planId?.valueOf(),
      hasCompletedRegister: user.hasCompletedRegister.valueOf(),
      registerData: user.registerData?.valueOf(),
      isBanned: user.isBanned.valueOf(),
      totalPosts: user.totalPosts.valueOf(),
      totalMedia: user.totalMedia.valueOf(),
      totalThreads: user.totalThreads.valueOf(),
      totalThreadResponses: user.totalThreadResponses.valueOf(),
      communityId: user.communityId.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      isOwner: user.isOwner.valueOf(),
      createdAt: user.createdAt.valueOf(),
      updatedAt: user.updatedAt.valueOf()
    }
  }
}
