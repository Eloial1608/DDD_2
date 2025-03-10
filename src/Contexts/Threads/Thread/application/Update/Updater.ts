import { NotAllowedToPersistThread } from '@Threads/Thread/domain/Errors/NotAllowedToPersistThread'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'
import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { BannerUrl } from '@Threads/Thread/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { Price } from '@Threads/Thread/domain/ValueObjects/Price'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { ThreadsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ThreadsConfiguration'

export class Updater {
  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

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

    const thread = await this.repository.find(id)

    if (!thread) throw new ThreadNotFound(id)

    if (thread.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistThread(thread.id)

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) throw new NotAllowedToPersistThread(thread.id)

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) throw new NotAllowedToPersistThread(thread.id)

    if (!(space.configuration as ThreadsConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as ThreadsConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const updatedThread = thread.update(
      id,
      title,
      content,
      bannerUrl,
      isPaid,
      price
    )

    await this.repository.persist(updatedThread)
    await this.eventBus.publish(updatedThread.pullDomainEvents())
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
