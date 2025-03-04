import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { BannerUrl } from '@Media/User/domain/ValueObjects/BannerUrl'
import { Name } from '@Media/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Media/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Media/User/domain/ValueObjects/Username'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Author } from '@Media/Media/domain/ValueObjects/Author'
import { MainId } from '@Media/User/domain/ValueObjects/MainId'

export class Updater {
  private LIMIT = 50

  constructor (private readonly repository: MediaRepository, private readonly eventBus: EventBus) {}

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

      const medias = await this.repository.search(criteria)

      for (const media of medias) {
        const updated = media.updateAuthor(
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

      offset += medias.length

      if (medias.length < this.LIMIT) break
    }
  }
}
