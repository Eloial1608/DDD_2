import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { TotalComments } from '@Course/Course/domain/ValueObjects/TotalComments'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: CourseRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const course = await this.repository.find(id)

    if (!course) return

    const updated = course.updateTotalComments(new TotalComments(course.totalComments.valueOf() + 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
