import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Accessibility } from './ValueObjects/Accessibility'
import { CommunityId } from './ValueObjects/CommunityId'
import { Configuration } from './ValueObjects/Configuration'
import { Id } from './ValueObjects/Id'
import { Type } from './ValueObjects/Type'
import { SpaceUpdatedDomainEvent } from './Events/SpaceUpdatedDomainEvent'
import { SpaceDeletedDomainEvent } from './Events/SpaceDeletedDomainEvent'
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
 delete (): Space {
      const space = new Space(
        this.id,
        this.communityId,
        this.accessibility,
        this.configuration,
        this.type
      )
  
      space.record(SpaceDeletedDomainEvent.fromAggregate(space))
      
     return space
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
