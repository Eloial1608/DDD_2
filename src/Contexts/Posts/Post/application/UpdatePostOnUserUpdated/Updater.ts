import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { BannerUrl } from '@Posts/User/domain/ValueObjects/BannerUrl'
import { Name } from '@Posts/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Posts/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Posts/User/domain/ValueObjects/Username'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Author } from '@Posts/Post/domain/ValueObjects/Author'
import { MainId } from '@Posts/User/domain/ValueObjects/MainId'

export class Updater {
  private LIMIT = 50

  constructor (private readonly repository: PostRepository, private readonly eventBus: EventBus) {}

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

      const posts = await this.repository.search(criteria)

      for (const post of posts) {
        const updated = post.updateAuthor(
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

      offset += posts.length

      if (posts.length < this.LIMIT) break
    }
  }
}
