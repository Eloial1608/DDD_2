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
  
}
