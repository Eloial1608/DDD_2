import { Community } from '@Projects/Community/domain/Community'
import { Id } from '@Projects/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Projects/Community/domain/ValueObjects/IsPrivate'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class CommunityMother {
  static create (params: Partial<Community>): Community {
    return new Community(
      params.id ?? new Id(UuidMother.random()),
      params.isPrivate ?? new IsPrivate(false)
    )
  }

  static random (): Community {
    return this.create({})
  }
}
