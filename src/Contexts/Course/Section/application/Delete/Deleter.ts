import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
export class Deleter {
  constructor (private readonly repository: SectionRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    courseId: CourseId
  ): Promise<void> {
    const existingSection = await this.repository.find(id)
    if (!existingSection || existingSection.courseId.valueOf() !== courseId.valueOf()) return

    const section = existingSection.delete()

    await this.repository.persist(section)

    await this.eventBus.publish(section.pullDomainEvents())
  }
}
