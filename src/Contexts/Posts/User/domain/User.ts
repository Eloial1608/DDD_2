import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { MainId } from './ValueObjects/MainId'
import { CommunityId } from './ValueObjects/CommunityId'
import { Name } from './ValueObjects/Name'
import { Username } from './ValueObjects/Username'
import { PictureUrl } from './ValueObjects/PictureUrl'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { IsAdmin } from './ValueObjects/IsAdmin'
import { IsOwner } from './ValueObjects/IsOwner'
import { Nullable } from '@Shared/domain/Nullable'
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent'
import { UserDeletedDomainEvent } from './Events/UserDeletedDomainEvent'
import { UserUpdatedDomainEvent } from './Events/UserUpdatedDomainEvent'
import { UserIsAdminUpdatedDomainEvent } from './Events/UserIsAdminUpdatedDomainEvent'

export class User extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly mainId: MainId,
        readonly communityId: CommunityId,
        readonly name: Name,
        readonly username: Username,
        readonly pictureUrl: Nullable<PictureUrl>,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly isAdmin: IsAdmin,
        readonly isOwner: IsOwner
  ) {
    super()
  }

  static create (
    id: Id,
    mainId: MainId,
    communityId: CommunityId,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>,
    isAdmin: IsAdmin,
    isOwner: IsOwner
  ): User {
    const user = new User(id, mainId, communityId, name, username, pictureUrl, bannerUrl, isAdmin, isOwner)

    user.record(UserCreatedDomainEvent.fromAggregate(user))

    return user
  }

  update (
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>
  ): User {
    const user = new User(
      this.id,
      this.mainId,
      this.communityId,
      name,
      username,
      pictureUrl,
      bannerUrl,
      this.isAdmin,
      this.isOwner
    )

    user.record(UserUpdatedDomainEvent.fromAggregate(user))

    return user
  }

  updateIsAdmin (
    isAdmin: IsAdmin
  ): User {
    const user = new User(
      this.id,
      this.mainId,
      this.communityId,
      this.name,
      this.username,
      this.pictureUrl,
      this.bannerUrl,
      isAdmin,
      this.isOwner
    )

    user.record(UserIsAdminUpdatedDomainEvent.fromAggregate(user))

    return user
  }

  delete (): User {
    const user = new User(
      this.id,
      this.mainId,
      this.communityId,
      this.name,
      this.username,
      this.pictureUrl,
      this.bannerUrl,
      this.isAdmin,
      this.isOwner
    )

    user.record(UserDeletedDomainEvent.fromAggregate(user))

    return user
  }
}
