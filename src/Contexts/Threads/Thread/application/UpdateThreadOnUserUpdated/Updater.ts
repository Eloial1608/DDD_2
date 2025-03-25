import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { BannerUrl } from '@Threads/User/domain/ValueObjects/BannerUrl'
import { Name } from '@Threads/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Threads/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Threads/User/domain/ValueObjects/Username'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Author } from '@Threads/Thread/domain/ValueObjects/Author'
import { MainId } from '@Threads/User/domain/ValueObjects/MainId'

export class Updater {
  private LIMIT = 50

  constructor (private readonly repository: ThreadRepository, private readonly eventBus: EventBus) {}

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

      const threads = await this.repository.search(criteria)

      for (const thread of threads) {
        const updated = thread.updateAuthor(
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

      offset += threads.length

      if (threads.length < this.LIMIT) break
    }
  }
}
