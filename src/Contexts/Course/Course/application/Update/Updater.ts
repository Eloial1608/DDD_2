import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { NotAllowedToPersistCourse } from '@Course/Course/domain/Errors/NotAllowedToPersistCourse'
import { BannerUrl } from '@Course/Course/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { MaxStudents } from '@Course/Course/domain/ValueObjects/MaxStudents'
import { Price } from '@Course/Course/domain/ValueObjects/Price'
import { SpaceId } from '@Course/Course/domain/ValueObjects/SpaceId'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CourseConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/CourseConfiguration'

export class Updater {
  constructor (private readonly repository: CourseRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>,
    startDate: StartDate,
    endDate: Nullable<EndDate>,
    maxStudents: Nullable<MaxStudents>
  ) {
    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    if (endDate && startDate > endDate) return

    const course = await this.repository.find(id)

    if (!course) throw new CourseNotFound(id)

    if (maxStudents && maxStudents < course.totalStudents) return

    if (course.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistCourse(course.id)

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) throw new NotAllowedToPersistCourse(course.id)

    const space = await this.findSpaceById(course.spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) throw new NotAllowedToPersistCourse(course.id)

    if (!(space.configuration as CourseConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as CourseConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const updatedCourse = course.update(
      id,
      title,
      bannerUrl,
      isPaid,
      price,
      startDate,
      endDate,
      maxStudents
    )

    await this.repository.persist(updatedCourse)
    await this.eventBus.publish(updatedCourse.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
