import { User } from '@Events/User/domain/User'
import { UserRepository } from '@Events/User/domain/UserRepository'
import { BannerUrl } from '@Events/User/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Events/User/domain/ValueObjects/CommunityId'
import { Id } from '@Events/User/domain/ValueObjects/Id'
import { IsAdmin } from '@Events/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Events/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Events/User/domain/ValueObjects/MainId'
import { Name } from '@Events/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Events/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Events/User/domain/ValueObjects/Username'
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
