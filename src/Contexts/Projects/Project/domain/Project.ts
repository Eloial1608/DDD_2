import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Title } from './ValueObjects/Title'
import { Nullable } from '@Shared/domain/Nullable'
import { Description } from './ValueObjects/Description'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { LeadUserId } from './ValueObjects/LeadUserId'
import { StartDate } from './ValueObjects/StartDate'
import { EndDate } from './ValueObjects/EndDate'
import { TotalTasks } from './ValueObjects/TotalTasks'
import { CommunityId } from './ValueObjects/CommunityId'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { ProjectCreatedDomainEvent } from './Events/ProjectCreatedDomainEvent'

export class Project extends AggregateRoot {
  constructor (
        readonly id:Id,
        readonly title:Title,
        readonly description: Nullable<Description>,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly leadUserId: LeadUserId,
        readonly startDate: Nullable<StartDate>,
        readonly endDate: Nullable<EndDate>,
        readonly totalTasks: TotalTasks,
        readonly communityId: CommunityId,
        readonly spaceId: SpaceId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>

  ) {
    super()
  }

  static create (
    id: Id,
    title: Title,
    description: Nullable<Description>,
    bannerUrl: Nullable<BannerUrl>,
    leadUserId: LeadUserId,
    startDate: Nullable<StartDate>,
    endDate: Nullable<EndDate>,
    communityId: CommunityId,
    spaceId: SpaceId,
    userId: UserId
  ) : Project {
    const project = new Project(
      id,
      title,
      description,
      bannerUrl,
      leadUserId,
      startDate,
      endDate,
      new TotalTasks(0),
      communityId,
      spaceId,
      userId,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    project.record(ProjectCreatedDomainEvent.fromAggregate(project))

    return project
  }
}
