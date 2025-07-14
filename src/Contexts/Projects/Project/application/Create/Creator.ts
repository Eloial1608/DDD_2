import { Project } from '@Projects/Project/domain/Project'
import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { BannerUrl } from '@Projects/Project/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { Description } from '@Projects/Project/domain/ValueObjects/Description'
import { EndDate } from '@Projects/Project/domain/ValueObjects/EndDate'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { LeadUserId } from '@Projects/Project/domain/ValueObjects/LeadUserId'
import { SpaceId } from '@Projects/Project/domain/ValueObjects/SpaceId'
import { StartDate } from '@Projects/Project/domain/ValueObjects/StartDate'
import { Title } from '@Projects/Project/domain/ValueObjects/Title'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (
        private readonly repository: ProjectRepository,
        private readonly eventBus: EventBus,
        private readonly queryBus: QueryBus
  ) {}

  async run (
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
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) return

    if ((endDate && startDate) && startDate > endDate) return

    const project = Project.create(
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

    await this.repository.persist(project)
    await this.eventBus.publish(project.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
