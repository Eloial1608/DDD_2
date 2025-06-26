import { StartDate } from "@Course/Course/domain/ValueObjects/StartDate";
import { Project } from "@Projects/Project/domain/Project";
import { BannerUrl } from "@Projects/Project/domain/ValueObjects/BannerUrl";
import { CommunityId } from "@Projects/Project/domain/ValueObjects/CommunityId";
import { CreatedAt } from "@Projects/Project/domain/ValueObjects/CreatedAt";
import { DeletedAt } from "@Projects/Project/domain/ValueObjects/DeletedAt";
import { Description } from "@Projects/Project/domain/ValueObjects/Description";
import { EndDate } from "@Projects/Project/domain/ValueObjects/EndDate";
import { Id } from "@Projects/Project/domain/ValueObjects/Id";
import { LeadUserId } from "@Projects/Project/domain/ValueObjects/LeadUserId";
import { SpaceId } from "@Projects/Project/domain/ValueObjects/SpaceId";
import { Title } from "@Projects/Project/domain/ValueObjects/Title";
import { TotalTasks } from "@Projects/Project/domain/ValueObjects/TotalTasks";
import { UpdatedAt } from "@Projects/Project/domain/ValueObjects/UpdatedAt";
import { UserId } from "@Projects/Project/domain/ValueObjects/UserId";
import { ValueObjectTransformer } from "@Shared/domain/ValueObjects/ValueObjectTransformer";
import { EntitySchema } from "typeorm";

export const ProjectSchema = new EntitySchema<Project>({
    name: 'project',
    target: Project,
    tableName: 'project',
    columns:{
        id:{
            primary: true,
            type: String,
            transformer: ValueObjectTransformer(Id)
        },
         title:{
            type: String,
            transformer: ValueObjectTransformer(Title)
        },
        description:{
            type: String,
            nullable: true,
            transformer: ValueObjectTransformer(Description)
        },
        bannerUrl:{
            type: String,
            nullable: true,
            transformer: ValueObjectTransformer(BannerUrl)
        },
        leadUserId:{
            type: String,
            transformer: ValueObjectTransformer(LeadUserId)
        },
        startDate:{
            type: Date,
            nullable: true,
            transformer: ValueObjectTransformer(StartDate)
        },
        endDate:{
            type: Date,
            nullable: true,
            transformer: ValueObjectTransformer(EndDate)
        },
        totalTasks:{
            type: Number,
            transformer: ValueObjectTransformer(TotalTasks)
        },
         communityId:{
            type: String,
            transformer: ValueObjectTransformer(CommunityId)
        },
        spaceId:{
            type: String,
            transformer: ValueObjectTransformer(SpaceId)
        },
         userId:{
            type: String,
            transformer: ValueObjectTransformer(UserId)
        },
          createdAt:{
            type: Date,
            transformer: ValueObjectTransformer(CreatedAt)
        },
        updatedAt:{
            type: Date,
            transformer: ValueObjectTransformer(UpdatedAt)
        },
        deletedAt:{
            type: Date,
            nullable: true,
            transformer: ValueObjectTransformer(DeletedAt)
        },


    }

})