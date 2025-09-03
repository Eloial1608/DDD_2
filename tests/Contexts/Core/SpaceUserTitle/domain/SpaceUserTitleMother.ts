import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/SpaceUserTitle/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { SpaceId } from '@Core/SpaceUserTitle/domain/ValueObjects/SpaceId'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'
import { UpdatedAt } from '@Core/SpaceUserTitle/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Core/SpaceUserTitle/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class SpaceUserTitleMother {
  static create (params: Partial<SpaceUserTitle>): SpaceUserTitle {
    return new SpaceUserTitle(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.titleId ?? new TitleId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): SpaceUserTitle {
    return this.create({})
  }
}
