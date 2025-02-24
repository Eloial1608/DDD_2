import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { NotAllowedToPersistCourse } from '@Course/Course/domain/Errors/NotAllowedToPersistCourse'

export class Deleter {
  constructor (private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingCourse = await this.repository.find(id)
    if (!existingCourse || existingCourse.communityId.valueOf() !== communityId.valueOf()) return

    if (existingCourse.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistCourse(id)

    const course = existingCourse.delete()

    await this.repository.persist(course)

    await this.eventBus.publish(course.pullDomainEvents())
  }
}
