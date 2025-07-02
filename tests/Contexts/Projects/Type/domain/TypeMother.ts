import { Type } from "@Projects/Type/domain/Type";
import { Color } from "@Projects/Type/domain/ValueObjects/Color";
import { CommunityId } from "@Projects/Type/domain/ValueObjects/CommunityId";
import { CreatedAt } from "@Projects/Type/domain/ValueObjects/CreatedAt";
import { Id } from "@Projects/Type/domain/ValueObjects/Id";
import { Title } from "@Projects/Type/domain/ValueObjects/Title";
import { UpdatedAt } from "@Projects/Type/domain/ValueObjects/UpdatedAt";
import { UuidMother } from "@Tests/Contexts/Shared/domain/UuidMother";

export class TypeMother{
    static create(params: Partial<Type>): Type{
        return new Type(
            params.id ?? new Id(UuidMother.random()),
            params.title ?? new Title(UuidMother.random()),
            params.description ?? null,
            params.color ?? new Color(UuidMother.random()),
            params.projectId ?? null,
            params.communityId ?? new CommunityId(UuidMother.random()),
            params.createdAt ?? new CreatedAt(new Date()),
            params.updatedAt ?? new UpdatedAt(new Date()),
            params.deletedAt ?? null
        )
    }

    static random(): Type{
        return this.create({})
    }
}