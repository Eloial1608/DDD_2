import { CreatedEntity } from '@Metrics/CreatedEntity/domain/CreatedEntity'
import { CommunityId } from '@Metrics/CreatedEntity/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/CreatedEntity/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/CreatedEntity/domain/ValueObjects/Id'
import { TotalMedia } from '@Metrics/CreatedEntity/domain/ValueObjects/TotalMedia'
import { TotalPost } from '@Metrics/CreatedEntity/domain/ValueObjects/TotalPost'
import { TotalThread } from '@Metrics/CreatedEntity/domain/ValueObjects/TotalThread'


import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class CreatedEntityMother {
  static create (params: Partial<CreatedEntity>): CreatedEntity {
    return new CreatedEntity(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.totalPost ?? new TotalPost(0),
      params.totalMedia ?? new TotalMedia(0),
      params.totalThread ?? new TotalThread(0),  
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): CreatedEntity {
    return this.create({})
  }
}
