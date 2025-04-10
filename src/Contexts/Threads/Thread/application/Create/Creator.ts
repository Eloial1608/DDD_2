import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { ThreadsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ThreadsConfiguration'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { TitleNotNull } from '@Threads/Thread/domain/Errors/TitleNotNull'
import { Thread } from '@Threads/Thread/domain/Thread'
import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { Author } from '@Threads/Thread/domain/ValueObjects/Author'
import { BannerUrl } from '@Threads/Thread/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { ParentThreadId } from '@Threads/Thread/domain/ValueObjects/ParentThreadId'
import { Price } from '@Threads/Thread/domain/ValueObjects/Price'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'

export class Creator {
  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id:Id,
    communityId: CommunityId,
    spaceId: SpaceId,
    title: Nullable<Title>,
    parentThreadId: Nullable<ParentThreadId>,
    userId: UserId,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ) {
    if((parentThreadId && title) || (!parentThreadId && !title)) throw TitleNotNull

    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) return

    if (!(space.configuration as ThreadsConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as ThreadsConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const thread = Thread.create(
      id,
      communityId,
      spaceId,
      title,
      parentThreadId,
      userId,
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

    await this.repository.persist(thread)
    await this.eventBus.publish(thread.pullDomainEvents())
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
