import { Task } from '@Projects/Task/domain/Task'
import { TaskRepository } from '@Projects/Task/domain/TaskRepository'
import { Deadline } from '@Projects/Task/domain/ValueObjects/Deadline'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { Points } from '@Projects/Task/domain/ValueObjects/Points'
import { Priority } from '@Projects/Task/domain/ValueObjects/Priority'
import { ProjectId } from '@Projects/Task/domain/ValueObjects/ProjectId'
import { TaskStatus } from '@Projects/Task/domain/ValueObjects/TaskStatus'
import { TaskTypes } from '@Projects/Task/domain/ValueObjects/TaskTypes'
import { UserId } from '@Projects/Task/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Nullable } from '@Shared/domain/Nullable'
import { Title } from '@Projects/Task/domain/ValueObjects/Title'
import { DeletedAt } from '@Projects/Task/domain/ValueObjects/DeletedAt'
import { Description } from '@Projects/Task/domain/ValueObjects/Description'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { Author } from '@Projects/Task/domain/ValueObjects/Author'

export class Creator {
  constructor (private readonly repository: TaskRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    title: Title,
    description: Nullable<Description>,
    assignedUserId: Nullable<UserId>,
    priority: Nullable<Priority>,
    status: Nullable<TaskStatus>,
    type: Nullable<TaskTypes>,
    deadline: Nullable<Deadline>,
    points: Nullable<Points>,
    projectId: ProjectId,
    communityId: CommunityId,
    deletedAt: Nullable<DeletedAt>
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    let user

    if (assignedUserId && communityId) {
      user = await this.findUserByIdAndCommunityId(assignedUserId, communityId)
      if (!user) return
    }

    const created = Task.create(
      id,
      title,
      description,
      assignedUserId,
      user
        ? new Author(
          user.id,
          user.mainId,
          user.name,
          user.username,
          user.pictureUrl,
          user.bannerUrl
        )
        : null,
      priority,
      status,
      type,
      deadline,
      points,
      projectId,
      communityId
    )

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
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
}
