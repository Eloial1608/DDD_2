import { AggregateRoot } from "@Shared/domain/AggregateRoot";
import { Id } from "./ValueObjects/Id";
import { Title } from "./ValueObjects/Title";
import { Nullable } from "@Shared/domain/Nullable";
import { Description } from "./ValueObjects/Description";
import { Color } from "./ValueObjects/Color";
import { ProjectId } from "./ValueObjects/ProjectId";
import { CommunityId } from "./ValueObjects/CommunityId";
import { CreatedAt } from "./ValueObjects/CreatedAt";
import { UpdatedAt } from "./ValueObjects/UpdatedAt";
import { DeletedAt } from "./ValueObjects/DeletedAt";
import { TypeCreatedDomainEvent } from "./Events/TypeCreatedDomainEvent";

export class Type extends AggregateRoot{
    constructor(
        readonly id: Id,
        readonly title: Title,
        readonly description: Nullable<Description>,
        readonly color: Color,
        readonly projectId: Nullable<ProjectId>,
        readonly communityId: CommunityId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
    ){
        super()
    }

    static create(
        id: Id,
        title: Title,
        description: Nullable<Description>,
        color: Color,
        projectId: Nullable<ProjectId>,
        communityId: CommunityId,

    ): Type {
        const type = new  Type(
            id, 
            title, 
            description, 
            color, 
            projectId, 
            communityId, 
            new CreatedAt(new Date()),
            new UpdatedAt(new Date),
            null);

            type.record(TypeCreatedDomainEvent.fromAggregate(type));

            return type;
    }
}