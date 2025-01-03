import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { TotalLikes } from '@Posts/Post/domain/ValueObjects/TotalLikes'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const post = await this.repository.find(id)

    if (!post) return

    const updated = post.updateTotalLikes(new TotalLikes(post.totalLikes.valueOf() + 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
