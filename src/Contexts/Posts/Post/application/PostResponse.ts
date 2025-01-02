import { Nullable } from '@Shared/domain/Nullable'
import { Post } from '../domain/Post'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type PostResponseBody = {
    readonly id: string
    readonly communityId: string
    readonly userId: string
    readonly title: string
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
    totalComments: number
    readonly price: Nullable<{value: number, currency: string}>
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class PostResponse implements QueryResponse<PostResponseBody> {
  response: PostResponseBody

  constructor (post: Post) {
    this.response = {
      id: post.id.valueOf(),
      communityId: post.communityId.valueOf(),
      userId: post.userId.valueOf(),
      title: post.title.valueOf(),
      spaceId: post.spaceId.valueOf(),
      content: post.content.valueOf(),
      bannerUrl: post.bannerUrl?.valueOf(),
      author: post.author.toPrimitives(),
      isPaid: post.isPaid.valueOf(),
      price: post.price
        ? {
            value: post.price.value.valueOf(),
            currency: post.price.currency.valueOf()
          }
        : null,
      totalLikes: post.totalLikes.valueOf(),
      totalComments: post.totalComments.valueOf(),
      createdAt: post.createdAt.valueOf(),
      updatedAt: post.updatedAt.valueOf()
    }
  }
}
