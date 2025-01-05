import { Id } from '@Media/Comment/domain/ValueObjects/Id'
import { CommentRepository } from '@Media/Comment/domain/CommentRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { UserId } from '@Media/Comment/domain/ValueObjects/UserId'

export class Deleter {
  constructor (private readonly repository: CommentRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId
  ): Promise<void> {
    const existingComment = await this.repository.find(id)
    if (!existingComment || existingComment.userId.valueOf() !== userId.valueOf()) return

    const comment = existingComment.delete()

    await this.repository.delete(comment)

    await this.eventBus.publish(comment.pullDomainEvents())
  }
}
