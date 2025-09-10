import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { CommunityId } from '@Core/UserTitle/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/UserTitle/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'
import { UpdatedAt } from '@Core/UserTitle/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Core/UserTitle/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class UserTitleMother {
  static create (params: Partial<UserTitle>): UserTitle {
    return new UserTitle(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.titleId ?? new TitleId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): UserTitle {
    return this.create({})
  }
}
