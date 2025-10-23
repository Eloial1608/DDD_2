import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { TypeRepository } from '../../domain/TypeRepository'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Id } from '../../domain/ValueObjects/Id'
import { Title } from '../../domain/ValueObjects/Title'
import { Nullable } from '@Shared/domain/Nullable'
import { Description } from '../../domain/ValueObjects/Description'
import { Color } from '../../domain/ValueObjects/Color'
import { ProjectId } from '../../domain/ValueObjects/ProjectId'
import { CommunityId } from '../../domain/ValueObjects/CommunityId'
import { Type } from '../../domain/Type'
import { FindProjectByIdQuery } from '@Projects/Project/application/FindById/FindProjectByIdQuery'
import { ProjectResponse } from '@Projects/Project/application/ProjectResponse'

export class Creator {
  constructor (private readonly repository: TypeRepository, private readonly queryBus:QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    title: Title,
    description: Nullable<Description>,
    color: Color,
    projectId: Nullable<ProjectId>,
    communityId: CommunityId
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    if (projectId) {
      const project = await this.findProjectById(projectId)

      if (!project) return
    }

    const type = Type.create(
      id,
      title,
      description,
      color,
      projectId,
      communityId
    )

    await this.repository.persist(type)
    await this.eventBus.publish(type.pullDomainEvents())
  }

  private async findProjectById (postId: ProjectId) {
    const query = new FindProjectByIdQuery(postId.valueOf())

    return (await this.queryBus.ask<ProjectResponse>(query)).response
  }
}
