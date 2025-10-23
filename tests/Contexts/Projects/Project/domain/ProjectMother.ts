import { Project } from '@Projects/Project/domain/Project'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Project/domain/ValueObjects/CreatedAt'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { LeadUserId } from '@Projects/Project/domain/ValueObjects/LeadUserId'
import { SpaceId } from '@Projects/Project/domain/ValueObjects/SpaceId'
import { Title } from '@Projects/Project/domain/ValueObjects/Title'
import { TotalTasks } from '@Projects/Project/domain/ValueObjects/TotalTasks'
import { UpdatedAt } from '@Projects/Project/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class ProjectMother {
  static create (params: Partial<Project>): Project {
    return new Project(
      params.id ?? new Id(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.description ?? null,
      params.bannerUrl ?? null,
      params.leadUserId ?? new LeadUserId(UuidMother.random()),
      params.startDate ?? null,
      params.endDate ?? null,
      params.totalTasks ?? new TotalTasks(0),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Project {
    return this.create({})
  }

  static forLeadUser (userId: LeadUserId): Project {
    return this.create({ leadUserId: userId })
  }
}
