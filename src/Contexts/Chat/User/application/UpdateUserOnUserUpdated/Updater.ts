import { UserRepository } from '@Chat/User/domain/UserRepository'
import { BannerUrl } from '@Chat/User/domain/ValueObjects/BannerUrl'
import { Id } from '@Chat/User/domain/ValueObjects/Id'
import { Name } from '@Chat/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Chat/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Chat/User/domain/ValueObjects/Username'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Updater {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>
  ) {
    const user = await this.repository.find(id)

    if (!user) return

    const updatedUser = user.update(
      name,
      username,
      pictureUrl,
      bannerUrl
    )

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
