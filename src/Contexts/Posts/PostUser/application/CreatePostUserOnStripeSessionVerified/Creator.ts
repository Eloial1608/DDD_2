import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { PostUserRepository } from '@Posts/PostUser/domain/PostUserRepository'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { UserId } from '@Posts/PostUser/domain/ValueObjects/UserId'
import { PostId } from '@Posts/PostUser/domain/ValueObjects/PostId'

export class Creator {
  constructor (private readonly repository: PostUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    postId: PostId
  ) {
    const postUser = PostUser.create(
      id,
      userId,
      postId
    )

    await this.repository.persist(postUser)
    await this.eventBus.publish(postUser.pullDomainEvents())
  }
}
