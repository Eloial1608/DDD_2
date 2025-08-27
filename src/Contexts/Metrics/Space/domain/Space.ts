import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { Type } from "./ValueObjects/Type";

export class Space extends AggregateRoot {
  constructor(
    public readonly id: Id,
    readonly communityId: CommunityId,
    public readonly type: Type
  ) {
    super();
  }
}