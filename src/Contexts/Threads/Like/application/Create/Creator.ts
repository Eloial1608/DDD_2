import { Like } from '@Threads/Like/domain/Like'
import { LikeRepository } from '@Threads/Like/domain/LikeRepository'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { ThreadId } from '@Threads/Like/domain/ValueObjects/ThreadId'
import { UserId } from '@Threads/Like/domain/ValueObjects/UserId'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse } from '@Threads/Thread/application/ThreadResponse'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { ThreadsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ThreadsConfiguration'

export class Creator {
  constructor (private readonly repository: LikeRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    threadId: ThreadId,
    userId: UserId
  ) {
    const like = await this.repository.find(id)

    if (like) return

    const thread = await this.findThreadById(threadId)
    const space = await this.findSpaceById(thread.spaceId)

    if (!(space.configuration as ThreadsConfiguration['configuration']).allowsLikes) return

    const created = Like.create(id, threadId, userId)

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findThreadById (threadId: ThreadId) {
    const query = new FindThreadByIdQuery(threadId.valueOf())

    return (await this.queryBus.ask<ThreadResponse>(query)).response
  }

  private async findSpaceById (id: string) {
    const spaceQuery = new FindSpaceByIdQuery(id)

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
