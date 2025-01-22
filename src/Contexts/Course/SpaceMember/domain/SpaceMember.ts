import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { IsModerator } from './ValueObjects/IsModerator'
import { SpaceMemberDeletedDomainEvent } from './Events/SpaceMemberDeletedDomainEvent'

export class SpaceMember extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly spaceId: SpaceId,
        readonly userId: UserId,
        readonly isModerator: IsModerator
  ) {
    super()
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
}
