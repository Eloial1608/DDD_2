import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { LikeRepository } from '@Posts/Like/domain/LikeRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { UserId } from '@Posts/Like/domain/ValueObjects/UserId'

export class Deleter {
  constructor (private readonly repository: LikeRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId
  ): Promise<void> {
    const existingLike = await this.repository.find(id)
    if (!existingLike || existingLike.userId.valueOf() !== userId.valueOf()) return

    const like = existingLike.delete()

    await this.repository.delete(like)

    await this.eventBus.publish(like.pullDomainEvents())
  }
}
