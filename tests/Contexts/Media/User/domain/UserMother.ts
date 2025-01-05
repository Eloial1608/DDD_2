import { User } from '@Media/User/domain/User'
import { CommunityId } from '@Media/User/domain/ValueObjects/CommunityId'
import { Id } from '@Media/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Media/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Media/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Media/User/domain/ValueObjects/MainId'
import { Name } from '@Media/User/domain/ValueObjects/Name'
import { Username } from '@Media/User/domain/ValueObjects/Username'
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
