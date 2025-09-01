import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { UserId } from "./ValueObjects/UserId";
import { CommunityId } from "./ValueObjects/CommunityId";
import { CreatedAt } from "./ValueObjects/CreatedAt";

export class NewUser extends AggregateRoot {
    constructor(
        readonly id: Id,
        readonly userId: UserId,
        readonly communityId: CommunityId,
        readonly createdAt: CreatedAt){
        super()
        }
}