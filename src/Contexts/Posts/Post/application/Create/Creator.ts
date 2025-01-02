import { Post } from '@Posts/Post/domain/Post'
import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Author } from '@Posts/Post/domain/ValueObjects/Author'
import { BannerUrl } from '@Posts/Post/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { Price } from '@Posts/Post/domain/ValueObjects/Price'
import { SpaceId } from '@Posts/Post/domain/ValueObjects/SpaceId'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { PostsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/PostsConfiguration'

export class Creator {
  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    spaceId: SpaceId,
    title: Title,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ) {
    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) return

    if (!(space.configuration as PostsConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as PostsConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const post = Post.create(
      id,
      communityId,
      userId,
      spaceId,
      title,
      content,
      bannerUrl,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      isPaid,
      price
    )

    await this.repository.persist(post)
    await this.eventBus.publish(post.pullDomainEvents())
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

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
