import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { TotalPost } from "./ValueObjects/TotalPost";
import { TotalMedia } from "./ValueObjects/TotalMedia";
import { TotalThread } from "./ValueObjects/TotalThread";
import { CreatedAt } from "./ValueObjects/CreatedAt";

export class CreatedEntity extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly totalPost: TotalPost,
        readonly totalMedia: TotalMedia,
        readonly totalThread: TotalThread,
        readonly createdAt: CreatedAt
    ) {
        super();
    }
}