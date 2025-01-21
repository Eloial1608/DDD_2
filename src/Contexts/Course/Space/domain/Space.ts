import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Accessibility } from './ValueObjects/Accessibility'
import { CommunityId } from './ValueObjects/CommunityId'
import { Configuration } from './ValueObjects/Configuration'
import { Id } from './ValueObjects/Id'
import { Type } from './ValueObjects/Type'
import { SpaceUpdatedDomainEvent } from './Events/SpaceUpdatedDomainEvent'

export class Space extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly accessibility: Accessibility,
        readonly configuration: Configuration,
        readonly type: Type
  ) {
    super()
  }

  update (
    accessibility: Accessibility,
    configuration: Configuration,
    type: Type
  ): Space {
    const space = new Space(
      this.id,
      this.communityId,
      accessibility,
      configuration,
      type
    )

    space.record(SpaceUpdatedDomainEvent.fromAggregate(space))

    return space
  }
}
