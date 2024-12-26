import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Accessibility } from './ValueObjects/Accessibility'
import { CommunityId } from './ValueObjects/CommunityId'
import { Configuration } from './ValueObjects/Configuration'
import { Id } from './ValueObjects/Id'
import { Type } from './ValueObjects/Type'
import { SpaceCreatedDomainEvent } from './Events/SpaceCreatedDomainEvent'

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

  static create (
    id: Id,
    communityId: CommunityId,
    accessibility: Accessibility,
    configuration: Configuration,
    type: Type
  ): Space {
    const space = new Space(
      id,
      communityId,
      accessibility,
      configuration,
      type
    )

    space.record(SpaceCreatedDomainEvent.fromAggregate(space))

    return space
  }
}
