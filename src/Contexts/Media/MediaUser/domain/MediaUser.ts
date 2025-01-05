import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { MediaId } from './ValueObjects/MediaId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { MediaUserCreatedDomainEvent } from './Events/MediaUserCreatedDomainEvent'

export class MediaUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly mediaId: MediaId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    mediaId: MediaId
  ): MediaUser {
    const mediaUser = new MediaUser(
      id,
      userId,
      mediaId,
      new CreatedAt(new Date())
    )

    mediaUser.record(MediaUserCreatedDomainEvent.fromAggregate(mediaUser))

    return mediaUser
  }
}
