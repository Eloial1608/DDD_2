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
import { UserUpdatedAboutAndNameDomainEvent } from './Events/UserUpdatedAboutAndNameEvent'
import { MainId } from './ValueObjects/MainId'
import { UserDeletedDomainEvent } from './Events/UserDeletedDomainEvent'
import { UserUnbannedDomainEvent } from './Events/UserUnbannedDomainEvent'
import { UserBannedDomainEvent } from './Events/UserBannedDoaminEvent'
import { UserHasPayedUpdatedDomainEvent } from './Events/UserHasPayedUpdatedDomainEvent'
import { PictureUrl } from './ValueObjects/PictureUrl'
import { BannerUrl } from './ValueObjects/BannerUrl'

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
    readonly pictureUrl: Nullable<PictureUrl>,
    readonly bannerUrl: Nullable<BannerUrl>,
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
      null,
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
      this.pictureUrl,
      this.bannerUrl,
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

  update (
    about: Nullable<About>,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>
  ):User {
    const user = new User(
      this.id,
      this.mainId,
      name,
      username,
      about,
      this.email,
      this.hasPayed,
      this.planId,
      pictureUrl,
      bannerUrl,
      this.hasCompletedRegister,
      this.registerData,
      this.isBanned,
      this.isAdmin,
      this.isOwner,
      this.totalPosts,
      this.totalMedia,
      this.totalThreads,
      this.totalThreadResponses,
      this.communityId,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )

    user.record(UserUpdatedAboutAndNameDomainEvent.fromAggregate(user))

    return user
  }

  updateHasPayed (hasPayed: HasPayed):User {
    const user = new User(
      this.id,
      this.mainId,
      this.name,
      this.username,
      this.about,
      this.email,
      hasPayed,
      this.planId,
      this.pictureUrl,
      this.bannerUrl,
      this.hasCompletedRegister,
      this.registerData,
      this.isBanned,
      this.isAdmin,
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

    user.record(UserHasPayedUpdatedDomainEvent.fromAggregate(user))

    return user
  }

  delete ():User {
    const user = new User(
      this.id,
      this.mainId,
      this.name,
      this.username,
      this.about,
      this.email,
      this.hasPayed,
      this.planId,
      this.pictureUrl,
      this.bannerUrl,
      this.hasCompletedRegister,
      this.registerData,
      this.isBanned,
      this.isAdmin,
      this.isOwner,
      this.totalPosts,
      this.totalMedia,
      this.totalThreads,
      this.totalThreadResponses,
      this.communityId,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    user.record(UserDeletedDomainEvent.fromAggregate(user))

    return user
  }

  unban ():User {
    const user = new User(
      this.id,
      this.mainId,
      this.name,
      this.username,
      this.about,
      this.email,
      this.hasPayed,
      this.planId,
      this.pictureUrl,
      this.bannerUrl,
      this.hasCompletedRegister,
      this.registerData,
      new IsBanned(false),
      this.isAdmin,
      this.isOwner,
      this.totalPosts,
      this.totalMedia,
      this.totalThreads,
      this.totalThreadResponses,
      this.communityId,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )

    user.record(UserUnbannedDomainEvent.fromAggregate(user))

    return user
  }

  ban ():User {
    const user = new User(
      this.id,
      this.mainId,
      this.name,
      this.username,
      this.about,
      this.email,
      this.hasPayed,
      this.planId,
      this.pictureUrl,
      this.bannerUrl,
      this.hasCompletedRegister,
      this.registerData,
      new IsBanned(true),
      this.isAdmin,
      this.isOwner,
      this.totalPosts,
      this.totalMedia,
      this.totalThreads,
      this.totalThreadResponses,
      this.communityId,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )

    user.record(UserBannedDomainEvent.fromAggregate(user))

    return user
  }
}
