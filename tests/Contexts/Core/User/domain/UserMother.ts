import { User } from '@Core/User/domain/User'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { HasCompletedRegister } from '@Core/User/domain/ValueObjects/HasCompletedRegister'
import { HasPayed } from '@Core/User/domain/ValueObjects/HasPayed'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { IsOwner } from '@Core/User/domain/ValueObjects/IsOwner'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { TotalMedia } from '@Core/User/domain/ValueObjects/TotalMedia'
import { TotalPosts } from '@Core/User/domain/ValueObjects/TotalPosts'
import { TotalThreadResponses } from '@Core/User/domain/ValueObjects/TotalThreadResponses'
import { TotalThreads } from '@Core/User/domain/ValueObjects/TotalThreads'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class UserMother {
  static create (params: Partial<User>): User {
    const name = params.name ?? new Name(WordMother.random())
    const id = params.id ?? new Id(UuidMother.random())
    return new User(
      id,
      id,
      name,
      params.username ?? Username.createFromNonSlug(
        `${name.valueOf()}-${id.valueOf().substring(0, id.valueOf().indexOf('-') - 1)}`
      ),
      params.about ?? null,
      params.email ?? new Email(MotherCreator.random().internet.email()),
      params.hasPayed ?? new HasPayed(false),
      params.planId ?? null,
      params.pictureUrl ?? null,
      params.bannerUrl ?? null,
      params.hasCompletedRegister ?? new HasCompletedRegister(false),
      params.registerData ?? null,
      params.isBanned ?? new IsBanned(false),
      params.isAdmin ?? new IsAdmin(false),
      params.isOwner ?? new IsOwner(false),
      params.totalPosts ?? new TotalPosts(0),
      params.totalMedia ?? new TotalMedia(0),
      params.totalThreads ?? new TotalThreads(0),
      params.totalThreadResponses ?? new TotalThreadResponses(0),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.principalTitle ?? null,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): User {
    return this.create({})
  }
}
