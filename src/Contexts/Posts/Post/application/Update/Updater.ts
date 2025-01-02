import { NotAllowedToPersistPost } from '@Posts/Post/domain/Errors/NotAllowedToPersistPost'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'
import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { BannerUrl } from '@Posts/Post/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { Price } from '@Posts/Post/domain/ValueObjects/Price'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Updater {
  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    title: Title,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ) {
    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    const post = await this.repository.find(id)

    if (!post) throw new PostNotFound(id)

    if (post.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistPost(post.id)

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) throw new NotAllowedToPersistPost(post.id)

    const updatedPost = post.update(
      id,
      title,
      content,
      bannerUrl,
      isPaid,
      price
    )

    await this.repository.persist(updatedPost)
    await this.eventBus.publish(updatedPost.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }
}
