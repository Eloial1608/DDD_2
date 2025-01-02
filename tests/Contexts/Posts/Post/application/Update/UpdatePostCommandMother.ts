import { UpdatePostCommand } from '@Posts/Post/application/Update/UpdatePostCommand'
import { Post } from '@Posts/Post/domain/Post'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdatePostCommandMother {
  static update (
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
  ): UpdatePostCommand {
    return new UpdatePostCommand(
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

  static fromAggregate (post: Post): UpdatePostCommand {
    return this.update(
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
