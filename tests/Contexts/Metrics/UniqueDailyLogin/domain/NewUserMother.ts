import { UniqueDailyLogin } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLogin'
import { CommunityId } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/Id'
import { UserId } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/UserId'

import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class UniqueDailyLoginMother {
  static create (params: Partial<UniqueDailyLogin>): UniqueDailyLogin {
    return new UniqueDailyLogin(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): UniqueDailyLogin {
    return this.create({})
  }
}
