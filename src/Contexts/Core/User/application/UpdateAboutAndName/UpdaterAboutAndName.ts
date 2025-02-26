import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { About } from '@Core/User/domain/ValueObjects/About'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Nullable } from '@Shared/domain/Nullable'
import { PictureUrl } from '@Core/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Core/User/domain/ValueObjects/BannerUrl'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class UpdaterAboutAndName {
  constructor (
    private readonly repository: UserRepository,
    private readonly eventBus: EventBus
  ) {}

  private LIMIT = 50

  async run (
    id: Id,
    about: Nullable<About>,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    let offset = 0

    for (;;) {
      const criteria = new Criteria(new Filters([
        Filter.simple('mainId', '=', user.mainId.valueOf())
      ]),
      undefined,
      undefined,
      this.LIMIT,
      offset
      )

      const users = await this.repository.search(criteria)

      for (const user of users) {
        const updatedUser = user.update(
          about,
          name,
          username,
          pictureUrl,
          bannerUrl
        )

        await this.repository.persist(updatedUser)
        await this.eventBus.publish(updatedUser.pullDomainEvents())
      }

      offset += users.length

      if (users.length < this.LIMIT) break
    }
  }
}
