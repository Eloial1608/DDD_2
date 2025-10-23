import { SpaceMember } from '@Projects/SpaceMember/domain/SpaceMember'
import { Id } from '@Projects/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Projects/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Projects/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Projects/SpaceMember/domain/ValueObjects/UserId'
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
