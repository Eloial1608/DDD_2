import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { CourseId } from './ValueObjects/CourseId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { CourseUserCreatedDomainEvent } from './Events/CourseUserCreatedDomainEvent'

export class CourseUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly courseId: CourseId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    courseId: CourseId
  ): CourseUser {
    const courseUser = new CourseUser(
      id,
      userId,
      courseId,
      new CreatedAt(new Date())
    )

    courseUser.record(CourseUserCreatedDomainEvent.fromAggregate(courseUser))

    return courseUser
  }
}
