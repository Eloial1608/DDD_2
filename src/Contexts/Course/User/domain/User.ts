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
import { UserDeletedDomainEvent } from './Events/UserDeletedDomainEvent'

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
