import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { CreatedAt } from '@Projects/ProjectUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { ProjectId } from '@Projects/ProjectUser/domain/ValueObjects/ProjectId'
import { UserId } from '@Projects/ProjectUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class ProjectUserMother {
  static create (params: Partial<ProjectUser>): ProjectUser {
    return new ProjectUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.projectId ?? new ProjectId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): ProjectUser {
    return this.create({})
  }
}
