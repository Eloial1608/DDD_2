import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'
import { CommunityId } from '@Metrics/UserRetention/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/UserRetention/domain/ValueObjects/CreatedAt'
import { EndDate } from '@Metrics/UserRetention/domain/ValueObjects/EndDate'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { StartDate } from '@Metrics/UserRetention/domain/ValueObjects/StartDate'
import { UserId } from '@Metrics/UserRetention/domain/ValueObjects/UserId'

import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class UserRetentionMother {
  static create (params: Partial<UserRetention>): UserRetention {
    return new UserRetention(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.startDate ?? new StartDate(new Date()),
      params.endDate ?? null,
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): UserRetention {
    return this.create({})
  }
}
