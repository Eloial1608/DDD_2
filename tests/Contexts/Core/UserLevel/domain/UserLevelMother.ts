import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/UserLevel/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { IntegerMother } from '@Tests/Contexts/Shared/domain/IntegerMother'
import { UserId } from '@Core/UserLevel/domain/ValueObjects/UserId'
import { CurrentExp } from '@Core/UserLevel/domain/ValueObjects/CurrentExp'
import { LevelId } from '@Core/UserLevel/domain/ValueObjects/LevelId'

export class UserLevelMother {
  static create (params: Partial<UserLevel>): UserLevel {
    const currentExp = params.currentExp ?? new CurrentExp(IntegerMother.positive())
    const id = params.id ?? new Id(UuidMother.random())
    return new UserLevel(
      id,
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.levelId ?? new LevelId(UuidMother.random()),
      currentExp,
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): UserLevel {
    return this.create({})
  }
}
