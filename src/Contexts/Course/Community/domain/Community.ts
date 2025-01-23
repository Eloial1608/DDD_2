import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { CommunityCreatedDomainEvent } from '@Course/Community/domain/Events/CommunityCreatedDomainEvent'
import { CommunityDeletedDomainEvent } from './Events/CommunityDeletedDomainEvent'

export class Community extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly isPrivate: IsPrivate
  ) {
    super()
  }

  static create (
    id: Id,
    isPrivate: IsPrivate
  ): Community {
    const community = new Community(
      id,
      isPrivate
    )

    community.record(CommunityCreatedDomainEvent.fromAggregate(community))

    return community
  }

    delete (): Community {
      const community = new Community(
        this.id,
        this.isPrivate
      )
  
      community.record(CommunityDeletedDomainEvent.fromAggregate(community))
  
      return community
    }
}
