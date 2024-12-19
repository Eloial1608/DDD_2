import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from "@Core/UserPlan/domain/ValueObjects/Id";
import { Name } from "@Core/UserPlan/domain/ValueObjects/Name";
import { Description } from "@Core/UserPlan/domain/ValueObjects/Description";
import { PlanId } from "@Core/UserPlan/domain/ValueObjects/PlanId";
import { UserId } from "@Core/UserPlan/domain/ValueObjects/UserId";
import { Price } from "@Core/UserPlan/domain/ValueObjects/Price";
import { RenovationInterval } from "@Core/Plan/domain/ValueObjects/RenovationInterval";
import { RenovationType } from "@Core/UserPlan/domain/ValueObjects/RenovationType";
import { ExpiresAt } from "@Core/UserPlan/domain/ValueObjects/ExpiresAt";
import { CreatedAt } from "@Core/UserPlan/domain/ValueObjects/CreatedAt";
import { UpdatedAt } from "@Core/UserPlan/domain/ValueObjects/UpdatedAt";

export class UserPlan extends AggregateRoot{
    constructor(
        readonly id: Id,
        readonly name: Name,
        readonly description: Description,
        readonly planId: PlanId,
        readonly userId: UserId,
        readonly price: Price,
        readonly renovationInterval: RenovationInterval,
        readonly renovationType: RenovationType,
        readonly expiresAt: ExpiresAt,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
        
    ){
        super()
    }
}