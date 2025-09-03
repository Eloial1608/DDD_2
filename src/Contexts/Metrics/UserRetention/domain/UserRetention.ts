import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { UserId } from "./ValueObjects/UserId";
import { CommunityId } from "./ValueObjects/CommunityId";
import { StartDate } from "./ValueObjects/StartDate";
import { EndDate } from "./ValueObjects/EndDate";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { Nullable } from "@Shared/domain/Nullable";

export class UserRetention extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly userId: UserId,
        readonly communityId: CommunityId,
        readonly startDate: StartDate,
        readonly endDate: Nullable<EndDate>,
        readonly createdAt: CreatedAt
    ) {
        super();
    }
}