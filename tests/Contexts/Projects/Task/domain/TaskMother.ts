import { Task } from '@Projects/Task/domain/Task'
import { CommunityId } from '@Projects/Task/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Task/domain/ValueObjects/CreatedAt'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { ProjectId } from '@Projects/Task/domain/ValueObjects/ProjectId'
import { Title } from '@Projects/Task/domain/ValueObjects/Title'
import { UpdatedAt } from '@Projects/Task/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class TaskMother {
  static create (params: Partial<Task>): Task {
    return new Task(
      params.id ?? new Id(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.description ?? null,
      params.assignedUserId ?? null,
      params.assignedUser ?? null,
      params.priority ?? null,
      params.status ?? null,
      params.type ?? null,
      params.deadline ?? null,
      params.points ?? null,
      params.projectId ?? new ProjectId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Task {
    return this.create({})
  }
}
