import { Status } from '@Projects/Status/domain/Status'
import { Color } from '@Projects/Status/domain/ValueObjects/Color'
import { CommunityId } from '@Projects/Status/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Status/domain/ValueObjects/CreatedAt'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'
import { Order } from '@Projects/Status/domain/ValueObjects/Order'
import { ProjectId } from '@Projects/Status/domain/ValueObjects/ProjectId'
import { Title } from '@Projects/Status/domain/ValueObjects/Title'
import { UpdatedAt } from '@Projects/Status/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class StatusMother {
  static create (params: Partial<Status>): Status {
    return new Status(
      params.id ?? new Id(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.description ?? null,
      params.order ?? new Order(0),
      params.color ?? new Color(WordMother.random()),
      params.projectId ?? new ProjectId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Status {
    return this.create({})
  }
}
