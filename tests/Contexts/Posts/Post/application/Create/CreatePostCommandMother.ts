import { CreatePostCommand } from '@Posts/Post/application/Create/CreatePostCommand'
import { Post } from '@Posts/Post/domain/Post'
import { Nullable } from '@Shared/domain/Nullable'

export class CreatePostCommandMother {
  static create (
    id: string,
    communityId: string,
    userId: string,
    title: string,
    content: string,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    price: Nullable<{
      value: number,
      currency: string
  }>
  ): CreatePostCommand {
    return new CreatePostCommand(
      id,
      communityId,
      userId,
      title,
      content,
      bannerUrl,
      isPaid,
      price
    )
  }

  static fromAggregate (post: Post): CreatePostCommand {
    return this.create(
      post.id.valueOf(),
      post.communityId.valueOf(),
      post.userId.valueOf(),
      post.title.valueOf(),
      post.content.valueOf(),
      post.bannerUrl?.valueOf(),
      post.isPaid.valueOf(),
      post.price
        ? {
            value: post.price.value.valueOf(),
            currency: post.price.currency.valueOf()
          }
        : null
    )
  }
}
