import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Section } from '@Course/Section/domain/Section'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly reposiotry: SectionRepository, private readonly eventBus: EventBus) {}

  async run (
    id:Id,
    courseId: CourseId,
    title: Title
  ) {
    const existing = await this.reposiotry.find(id)

    if (existing) return

    const section = Section.create(
      id,
      courseId,
      title
    )

    await this.reposiotry.persist(section)
    await this.eventBus.publish(section.pullDomainEvents())
  }
}
