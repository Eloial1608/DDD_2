import { NewUser } from '@Metrics/NewUser/domain/NewUser'
import { CommunityId } from '@Metrics/NewUser/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/NewUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'
import { UserId } from '@Metrics/NewUser/domain/ValueObjects/UserId'

import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class NewUserMother {
  static create (params: Partial<NewUser>): NewUser {
    return new NewUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): NewUser {
    return this.create({})
  }
}
