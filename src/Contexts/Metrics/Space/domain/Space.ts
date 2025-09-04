import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { Type } from "./ValueObjects/Type";
import { SpaceCreatedDomainEvent } from "./Events/SpaceCreatedDomainEvent";

export class Space extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly type: Type
  ) {
    super()
  }
  
  static create(id: Id, communityId: CommunityId, type: Type): Space {
    const space = new Space(id, communityId, type);

    space.record(SpaceCreatedDomainEvent.fromAggregate(space))
    return space;}
  
  }

