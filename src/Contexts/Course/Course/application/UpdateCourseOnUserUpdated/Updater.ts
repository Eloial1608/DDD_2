import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { BannerUrl } from '@Course/User/domain/ValueObjects/BannerUrl'
import { Name } from '@Course/User/domain/ValueObjects/Name'
import { PictureUrl } from '@Course/User/domain/ValueObjects/PictureUrl'
import { Username } from '@Course/User/domain/ValueObjects/Username'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Author } from '@Course/Course/domain/ValueObjects/Author'
import { MainId } from '@Course/User/domain/ValueObjects/MainId'

export class Updater {
  private LIMIT = 50

  constructor (private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

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

      const course = await this.repository.search(criteria)

      for (const courses of course) {
        const updated = courses.updateAuthor(
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

      offset += course.length

      if (course.length < this.LIMIT) break
    }
  }
}
