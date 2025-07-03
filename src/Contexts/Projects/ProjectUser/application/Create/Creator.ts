import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { ProjectUserRepository } from '@Projects/ProjectUser/domain/ProjectUserRepository'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { ProjectId } from '@Projects/ProjectUser/domain/ValueObjects/ProjectId'
import { UserId } from '@Projects/ProjectUser/domain/ValueObjects/UserId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
//import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  //constructor (private readonly repository: ProjectUserRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}
  constructor (private readonly repository: ProjectUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id:Id,
    userId: UserId,
    projectId: ProjectId
  ) {
    //const projectQuery = new FindProjectByIdQuery(projectId.valueOf())
    //const project = await (await this.queryBus.ask<ProjectResponse>(projectQuery)).response

    if (await this.existsProjectUserByProjectIdAndUserId(projectId, userId)) return

    const projectUser = ProjectUser.create(
      id,
      userId,
      projectId
    )

    await this.repository.persist(projectUser)
    await this.eventBus.publish(projectUser.pullDomainEvents())
  }

  private async existsProjectUserByProjectIdAndUserId (projectId: ProjectId, userId: UserId): Promise<boolean> {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('projectId', '=', projectId.valueOf()),
        Filter.simple('userId', '=', userId.valueOf())
      ])
    )

    return (await this.repository.search(criteria)).length > 0
  }
}
