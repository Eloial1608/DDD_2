import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
export class Deleter {
  constructor (private readonly repository: LessonRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    sectionId: SectionId
  ): Promise<void> {
    const existingLesson = await this.repository.find(id)
    if (!existingLesson || existingLesson.sectionId.valueOf() !== sectionId.valueOf()) return

    const lesson = existingLesson.delete()

    await this.repository.persist(lesson)

    await this.eventBus.publish(lesson.pullDomainEvents())
  }
}
