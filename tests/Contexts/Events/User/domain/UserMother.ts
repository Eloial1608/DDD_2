import { User } from '@Events/User/domain/User'
import { CommunityId } from '@Events/User/domain/ValueObjects/CommunityId'
import { Id } from '@Events/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Events/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Events/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Events/User/domain/ValueObjects/MainId'
import { Name } from '@Events/User/domain/ValueObjects/Name'
import { Username } from '@Events/User/domain/ValueObjects/Username'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class UserMother {
  static create (params: Partial<User>): User {
    return new User(
      params.id ?? new Id(UuidMother.random()),
      params.mainId ?? new MainId(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.username ?? new Username(SlugMother.random()),
      params.pictureUrl ?? null,
      params.bannerUrl ?? null,
      params.isAdmin ?? new IsAdmin(false),
      params.isOwner ?? new IsOwner(false)
    )
  }

  static random (): User {
    return this.create({})
  }
}
