import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { CommunityId } from "./ValueObjects/CommunityId";
import { MainId } from "./ValueObjects/MainId";
import { Name } from "./ValueObjects/Name";
import { IsAdmin } from "./ValueObjects/IsAdmin";
import { IsOwner } from "./ValueObjects/IsOwner";
import { Username } from "./ValueObjects/Username";

export class User extends AggregateRoot{
    constructor(
        readonly id: Id,
        readonly mainId: MainId,
        readonly communityId: CommunityId,
        readonly name: Name,
        readonly username: Username,
        readonly isAdmin: IsAdmin,
        readonly isOwner: IsOwner){
            super();
        }
}