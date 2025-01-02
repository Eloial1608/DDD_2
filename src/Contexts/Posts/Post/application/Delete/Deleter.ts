import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { NotAllowedToPersistPost } from '@Posts/Post/domain/Errors/NotAllowedToPersistPost'
export class Deleter {
  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingPost = await this.repository.find(id)
    if (!existingPost || existingPost.communityId.valueOf() !== communityId.valueOf()) return

    if (existingPost.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistPost(id)

    const post = existingPost.delete()

    await this.repository.persist(post)

    await this.eventBus.publish(post.pullDomainEvents())
  }
}
