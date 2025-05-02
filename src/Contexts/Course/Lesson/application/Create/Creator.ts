import { Lesson } from '@Course/Lesson/domain/Lesson'
import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (private readonly repository: LessonRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    sectionId: SectionId,
    title: Title,
    content: Content
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const section = await this.findSectionById(sectionId)

    if (!section) return

    const lesson = Lesson.create(
      id,
      sectionId,
      title,
      content
    )

    await this.repository.persist(lesson)
    await this.eventBus.publish(lesson.pullDomainEvents())
  }

  private async findSectionById (id: SectionId) {
    const sectionQuery = new FindSectionByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SectionResponse>(sectionQuery)).response
  }
}
