import { Session } from '@Metrics/Session/domain/Session'
import { City } from '@Metrics/Session/domain/ValueObjects/City'
import { CommunityId } from '@Metrics/Session/domain/ValueObjects/CommunityId'
import { Country } from '@Metrics/Session/domain/ValueObjects/Country'
import { CreatedAt } from '@Metrics/Session/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/Session/domain/ValueObjects/Id'
import { UserId } from '@Metrics/Session/domain/ValueObjects/UserId'

import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class SessionMother {
  static create (params: Partial<Session>): Session {
    return new Session(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.country ?? new Country(WordMother.random()),
      params.city ?? new City(WordMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): Session {
    return this.create({})
  }
}
