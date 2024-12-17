import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Email } from './ValueObjects/Email'
import { About } from './ValueObjects/About'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { HasCompletedRegister } from './ValueObjects/HasCompletedRegister'
import { HasPayed } from './ValueObjects/HasPayed'
import { Id } from './ValueObjects/Id'
import { IsBanned } from './ValueObjects/IsBanned'
import { Name } from './ValueObjects/Name'
import { PlanId } from './ValueObjects/PlanId'
import { RegisterData } from './ValueObjects/RegisterData'
import { TotalMedia } from './ValueObjects/TotalMedia'
import { TotalPosts } from './ValueObjects/TotalPosts'
import { TotalThreadResponses } from './ValueObjects/TotalThreadResponses'
import { TotalThreads } from './ValueObjects/TotalThreads'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Username } from './ValueObjects/Username'
import { CommunityId } from './ValueObjects/CommunityId'
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent'
import { IsOwner } from './ValueObjects/IsOwner'
import { IsAdmin } from './ValueObjects/IsAdmin'
import { UserUpdatedIsAdminDomainEvent } from './Events/UserUpdatedIsAdminEvent'
import { MainId } from './ValueObjects/MainId'

export class User extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly mainId: MainId,
    readonly name: Name,
    readonly username: Username,
    readonly about: Nullable<About>,
    readonly email: Email,
    readonly hasPayed: HasPayed,
    readonly planId: Nullable<PlanId>,
    readonly hasCompletedRegister: HasCompletedRegister,
    readonly registerData: Nullable<RegisterData>,
    readonly isBanned: IsBanned,
    readonly isAdmin: IsAdmin,
    readonly isOwner: IsOwner,
    readonly totalPosts: TotalPosts,
    readonly totalMedia: TotalMedia,
    readonly totalThreads: TotalThreads,
    readonly totalThreadResponses: TotalThreadResponses,
    readonly communityId: CommunityId,
    readonly createdAt: CreatedAt,
    readonly updatedAt:UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    mainId: MainId,
    name: Name,
    username: Username,
    email: Email,
    communityId: CommunityId,
    isAdmin: IsAdmin,
    isOwner: IsOwner
  ): User {
    const user = new User(
      id,
      mainId,
      name,
      username,
      null,
      email,
      new HasPayed(false),
      null,
      new HasCompletedRegister(false),
      null,
      new IsBanned(false),
      isAdmin,
      isOwner,
      new TotalPosts(0),
      new TotalMedia(0),
      new TotalThreads(0),
      new TotalThreadResponses(0),
      communityId,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    user.record(UserCreatedDomainEvent.fromAggregate(user))

    return user
  }

  updateIsAdmin (
    isAdmin: IsAdmin):User {
    const user = new User(
      this.id,
      this.mainId,
      this.name,
      this.username,
      this.about,
      this.email,
      this.hasPayed,
      this.planId,
      this.hasCompletedRegister,
      this.registerData,
      this.isBanned,
      isAdmin,
      this.isOwner,
      this.totalPosts,
      this.totalMedia,
      this.totalThreads,
      this.totalThreadResponses,
      this.communityId,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )

    user.record(UserUpdatedIsAdminDomainEvent.fromAggregate(user))

    return user
  }
}
