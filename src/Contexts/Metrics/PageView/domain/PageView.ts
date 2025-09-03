import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { UserId } from "./ValueObjects/UserId";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { SpaceID } from "./ValueObjects/SpaceId";
import { CreatedAt } from "./ValueObjects/CreatedAt";

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
}