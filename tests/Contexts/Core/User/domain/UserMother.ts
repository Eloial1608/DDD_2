import { User } from '@Core/User/domain/User'
import { About } from '@Core/User/domain/ValueObjects/About'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { HasCompletedRegister } from '@Core/User/domain/ValueObjects/HasCompletedRegister'
import { HasPayed } from '@Core/User/domain/ValueObjects/HasPayed'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { PlanId } from '@Core/User/domain/ValueObjects/PlanId'
import { RegisterData } from '@Core/User/domain/ValueObjects/RegisterData'
import { TotalMedia } from '@Core/User/domain/ValueObjects/TotalMedia'
import { TotalPosts } from '@Core/User/domain/ValueObjects/TotalPosts'
import { TotalThreadResponses } from '@Core/User/domain/ValueObjects/TotalThreadResponses'
import { TotalThreads } from '@Core/User/domain/ValueObjects/TotalThreads'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class UserMother {
  static create (params: Partial<User>): User {
    return new User(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.username ?? new Username(SlugMother.random()),
      params.about ?? new About(WordMother.random()),
      params.email ?? new Email(MotherCreator.random().internet.email()),
      params.hasPayed ?? new HasPayed(false),
      params.planId ?? new PlanId(UuidMother.random()),
      params.hasCompletedRegister ?? new HasCompletedRegister(false),
      params.registerData ?? new RegisterData({}),
      params.isBanned ?? new IsBanned(false),
      params.totalPosts ?? new TotalPosts(0),
      params.totalMedia ?? new TotalMedia(0),
      params.totalThreads ?? new TotalThreads(0),
      params.totalThreadResponses ?? new TotalThreadResponses(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): User {
    return this.create({})
  }
}
