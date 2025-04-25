import { Nullable } from '@Shared/domain/Nullable'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { Thread } from '../domain/Thread'

export type ThreadResponseBody ={
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: Nullable<string>
    readonly parentThreadId:Nullable<string>
    readonly content: string
    readonly bannerUrl: Nullable<string>
    readonly spaceId: string
    readonly author: {
        id: string
        mainId: string
        name: string
        username: string
        bannerUrl: Nullable<string>
        pictureUrl: Nullable<string>
    }
    readonly isPaid: boolean
    totalLikes: number
    totalThreads: number
    readonly price: Nullable<{value: number, currency: string}>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class ThreadResponse implements QueryResponse<ThreadResponseBody> {
  response: ThreadResponseBody

  constructor (thread: Thread) {
    this.response = {
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title?.valueOf(),
      parentThreadId: thread.parentThreadId?.valueOf(),
      spaceId: thread.spaceId.valueOf(),
      content: thread.content.valueOf(),
      bannerUrl: thread.bannerUrl?.valueOf(),
      author: thread.author.toPrimitives(),
      isPaid: thread.isPaid.valueOf(),
      price: thread.price?.value?.valueOf() != null
        ? {
            value: thread.price.value.valueOf(),
            currency: thread.price.currency.valueOf()
          }
        : null,
      totalLikes: thread.totalLikes.valueOf(),
      totalThreads: thread.totalThreads.valueOf(),
      createdAt: thread.createdAt.valueOf(),
      updatedAt: thread.updatedAt.valueOf()
    }
  }
}
