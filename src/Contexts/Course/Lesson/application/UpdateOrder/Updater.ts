import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'
import { Order } from '@Course/Lesson/domain/ValueObjects/Order'

export class Updater {
  constructor (private readonly repository: LessonRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    order: Order
  ) {
    const lesson = await this.repository.find(id)

    if (!lesson) throw new LessonNotFound(id)

    const updatedLesson = lesson.updateOrder(order)

    await this.repository.persist(updatedLesson)
    await this.eventBus.publish(updatedLesson.pullDomainEvents())
  }
}
