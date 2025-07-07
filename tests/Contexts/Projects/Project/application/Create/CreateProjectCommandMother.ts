import { CreateProjectCommand } from "@Projects/Project/application/Create/CreateProjectCommand";
import { Project } from "@Projects/Project/domain/Project";
import { Nullable } from "@Shared/domain/Nullable";

export class CreateProjectCommandMother{
    static create(
        id: string,
        title: string,
        description: Nullable<string>,
        bannerUrl: Nullable<string>,
        leadUserId: string,
        startDate: Nullable<Date>,
        endDate: Nullable<Date>,
        communityId: string,
        spaceId: string,
        userId :string
    ): CreateProjectCommand{
        return new CreateProjectCommand(
            id,
            title,
            description,
            bannerUrl,
            leadUserId,
            startDate,
            endDate,
            communityId,
            spaceId,
            userId
        )
    }

    static fromAggregate(project:Project): CreateProjectCommand{
        return this.create(
            project.id.valueOf(),
            project.title.valueOf(),
            project.description ? project.description.valueOf() : null,
            project.bannerUrl ? project.bannerUrl.valueOf() : null,
            project.leadUserId.valueOf(),
            project.startDate ? project.startDate.valueOf() : null,
            project.endDate ? project.endDate.valueOf() : null,
            project.communityId.valueOf(),
            project.spaceId.valueOf(),
            project.userId.valueOf()
        )
    }
}