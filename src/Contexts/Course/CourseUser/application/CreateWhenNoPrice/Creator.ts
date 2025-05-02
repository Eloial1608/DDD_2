import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseUserRepository } from '@Course/CourseUser/domain/CourseUserRepository'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { UserId } from '@Course/CourseUser/domain/ValueObjects/UserId'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { NotAllowedToPersistCourseUser } from '@Course/CourseUser/domain/Errors/NotAllowedToPersistCourseUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Creator {
  constructor (
    private readonly repository: CourseUserRepository,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    userId: UserId,
    courseId: CourseId
  ) {
    const courseQuery = new FindCourseByIdQuery(courseId.valueOf())
    const course = await (await this.queryBus.ask<CourseResponse>(courseQuery)).response

    if (course.isPaid) throw new NotAllowedToPersistCourseUser(id)

    if (await this.existsCourseUserByCourseIdAndUserId(courseId, userId)) return

    const courseUser = CourseUser.create(
      id,
      userId,
      courseId
    )

    await this.repository.persist(courseUser)
    await this.eventBus.publish(courseUser.pullDomainEvents())
  }

  private async existsCourseUserByCourseIdAndUserId (courseId: CourseId, userId: UserId): Promise<boolean> {
    const criteria = new Criteria(
      new Filters([
        Filter.simple('courseId', '=', courseId.valueOf()),
        Filter.simple('userId', '=', userId.valueOf())
      ])
    )

    return (await this.repository.search(criteria)).length > 0
  }
}
