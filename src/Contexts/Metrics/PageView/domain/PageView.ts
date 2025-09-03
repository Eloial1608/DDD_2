import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { UserId } from "./ValueObjects/UserId";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { SpaceID } from "./ValueObjects/SpaceId";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { PageViewCreatedDomainEvent } from "./Events/PageViewCreatedDomainEvent";

export class PageView extends AggregateRoot {
  constructor(
    readonly id: Id,
    readonly userId: UserId,
    readonly communityId: CommunityId,
    readonly spaceId: SpaceID,
    readonly createdAt: CreatedAt
  ) {
    super();
  }

  static create(
    id: Id,
    userId: UserId,
    communityId: CommunityId,
    spaceId: SpaceID,
  ): PageView {
    
    const pageview = new PageView(id, userId, communityId, spaceId, new CreatedAt(new Date()));
    
    pageview.record(PageViewCreatedDomainEvent.fromAggregate(pageview));
    
    return pageview;
  }
}