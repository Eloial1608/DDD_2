import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { IsModerator } from './ValueObjects/IsModerator'
import { SpaceMemberDeletedDomainEvent } from './Events/SpaceMemberDeletedDomainEvent'
import { SpaceMemberCreatedDomainEvent } from './Events/SpaceMemberCreatedDomainEvent'

export class SpaceMember extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly spaceId: SpaceId,
        readonly userId: UserId,
        readonly isModerator: IsModerator
  ) {
    super()
  }

  static create (
    id: Id,
    spaceId: SpaceId,
    userId: UserId,
    isModerator: IsModerator
  ): SpaceMember {
    const spaceMember = new SpaceMember(
      id,
      spaceId,
      userId,
      isModerator
    )

    spaceMember.record(SpaceMemberCreatedDomainEvent.fromAggregate(spaceMember))

    return spaceMember
  }

  delete (): SpaceMember {
    const spaceMember = new SpaceMember(
      this.id,
      this.spaceId,
      this.userId,
      this.isModerator
    )

    spaceMember.record(SpaceMemberDeletedDomainEvent.fromAggregate(spaceMember))

    return spaceMember
  }
}
