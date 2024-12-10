import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/SpaceMember/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { IsBanned } from '@Core/SpaceMember/domain/ValueObjects/IsBanned'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { UpdatedAt } from '@Core/SpaceMember/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class SpaceMemberMother {
  static create (params: Partial<SpaceMember>): SpaceMember {
    return new SpaceMember(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.invitedBy ?? null,
      params.invitedAt ?? null,
      params.isModerator ?? new IsModerator(false),
      params.isBanned ?? new IsBanned(false),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): SpaceMember {
    return this.create({})
  }
}
