import { User } from '@Media/User/domain/User'
import { UserRepository } from '@Media/User/domain/UserRepository'
import { BannerUrl } from '@Media/User/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Media/User/domain/ValueObjects/CommunityId'
import { Id } from '@Media/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Media/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Media/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Media/User/domain/ValueObjects/MainId'
import { Name } from '@Media/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Media/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Media/User/domain/ValueObjects/Username'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Creator {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    mainId: MainId,
    communityId: CommunityId,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>,
    isAdmin: IsAdmin,
    isOwner: IsOwner
  ) {
    const user = await this.repository.find(id)

    if (user) return

    const createdUser = User.create(
      id,
      mainId,
      communityId,
      name,
      username,
      pictureUrl,
      bannerUrl,
      isAdmin,
      isOwner
    )

    await this.repository.persist(createdUser)
    await this.eventBus.publish(createdUser.pullDomainEvents())
  }
}
