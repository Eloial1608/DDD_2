import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { MediaUserRepository } from '@Media/MediaUser/domain/MediaUserRepository'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { UserId } from '@Media/MediaUser/domain/ValueObjects/UserId'
import { MediaId } from '@Media/MediaUser/domain/ValueObjects/MediaId'

export class Creator {
  constructor (private readonly repository: MediaUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    mediaId: MediaId
  ) {
    const mediaUser = MediaUser.create(
      id,
      userId,
      mediaId
    )

    await this.repository.persist(mediaUser)
    await this.eventBus.publish(mediaUser.pullDomainEvents())
  }
}
