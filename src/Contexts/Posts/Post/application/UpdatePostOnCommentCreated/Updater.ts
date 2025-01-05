import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { TotalComments } from '@Posts/Post/domain/ValueObjects/TotalComments'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const post = await this.repository.find(id)

    if (!post) return

    const updated = post.updateTotalComments(new TotalComments(post.totalComments.valueOf() + 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
