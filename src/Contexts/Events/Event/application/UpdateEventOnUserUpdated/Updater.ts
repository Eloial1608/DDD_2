import { EventRepository } from '@Events/Event/domain/EventRepository'
import { BannerUrl } from '@Events/User/domain/ValueObjects/BannerUrl'
import { Name } from '@Events/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Events/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Events/User/domain/ValueObjects/Username'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Author } from '@Events/Event/domain/ValueObjects/Author'
import { MainId } from '@Events/User/domain/ValueObjects/MainId'

export class Updater {
  private LIMIT = 50

  constructor (private readonly repository: EventRepository, private readonly eventBus: EventBus) {}

  async run (
    userId: UserId,
    mainId: MainId,
    name: Name,
    username: Username,
    pictureUrl: Nullable<PictureUrl>,
    bannerUrl: Nullable<BannerUrl>
  ) {
    let offset = 0

    for (;;) {
      const criteria = new Criteria(
        new Filters([
          Filter.simple('userId', '=', userId.valueOf())
        ]),
        undefined,
        undefined,
        this.LIMIT,
        offset
      )

      const events = await this.repository.search(criteria)

      for (const event of events) {
        const updated = event.updateAuthor(
          new Author(
            userId.valueOf(),
            mainId.valueOf(),
            name.valueOf(),
            username.valueOf(),
            pictureUrl?.valueOf(),
            bannerUrl?.valueOf()
          )
        )

        await this.repository.persist(updated)
        await this.eventBus.publish(updated.pullDomainEvents())
      }

      offset += events.length

      if (events.length < this.LIMIT) break
    }
  }
}
