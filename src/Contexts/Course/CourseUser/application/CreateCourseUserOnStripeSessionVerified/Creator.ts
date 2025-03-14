import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseUserRepository } from '@Course/CourseUser/domain/CourseUserRepository'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { UserId } from '@Course/CourseUser/domain/ValueObjects/UserId'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'

export class Creator {
  constructor (private readonly repository: CourseUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    courseId: CourseId
  ) {
    const courseUser = CourseUser.create(
      id,
      userId,
      courseId
    )

    await this.repository.persist(courseUser)
    await this.eventBus.publish(courseUser.pullDomainEvents())
  }
}
