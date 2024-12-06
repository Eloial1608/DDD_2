import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Auth/AuthUser/domain/ValueObjects/CreatedAt'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { UserId } from '@Auth/AuthUser/domain/ValueObjects/UserId'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class AuthUserMother {
  static create (params: Partial<AuthUser>): AuthUser {
    return new AuthUser(
      params.id ?? new Id(UuidMother.random()),
      params.email ?? new Email(MotherCreator.random().internet.email()),
      params.method ?? new Method(ValidMethods.PASSWORD),
      params.secret ?? new Secret(WordMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): AuthUser {
    return this.create({})
  }
}
