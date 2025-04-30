import { SpaceMember } from '@Chat/SpaceMember/domain/SpaceMember'
import { Id } from '@Chat/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Chat/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Chat/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Chat/SpaceMember/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class SpaceMemberMother {
  static create (params: Partial<SpaceMember>): SpaceMember {
    return new SpaceMember(
      params.id ?? new Id(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.isModerator ?? new IsModerator(false)
    )
  }

  static random (): SpaceMember {
    return this.create({})
  }
}
