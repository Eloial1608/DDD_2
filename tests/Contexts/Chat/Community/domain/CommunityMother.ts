import { Community } from '@Chat/Community/domain/Community'
import { Id } from '@Chat/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Chat/Community/domain/ValueObjects/IsPrivate'
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
