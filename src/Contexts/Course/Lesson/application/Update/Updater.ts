import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { SectionId } from '@Course/Lesson/domain/ValueObjects/SectionId'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Title } from '@Course/Lesson/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'
import { Type } from '@Course/Lesson/domain/ValueObjects/Type'
import { Content } from '@Course/Lesson/domain/ValueObjects/Content'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'
import { NotAllowedToPersistLesson } from '@Course/Lesson/domain/Errors/NotAllowedToPersistLesson'

export class Updater {
  constructor (private readonly repository: LessonRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    sectionId: SectionId,
    title: Title,
    type: Type,
    content: Content
  ) {
    const lesson = await this.repository.find(id)

    if (!lesson) throw new LessonNotFound(id)

    if (lesson.sectionId.valueOf() !== sectionId.valueOf()) throw new NotAllowedToPersistLesson(lesson.id)

    const course = await this.findSectionById(sectionId)

    if (!course) throw new NotAllowedToPersistLesson(lesson.id)

    const updatedLesson = lesson.update(
      id,
      title,
      type,
      content
    )

    await this.repository.persist(updatedLesson)
    await this.eventBus.publish(updatedLesson.pullDomainEvents())
  }

  private async findSectionById (id: SectionId) {
    const courseQuery = new FindSectionByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SectionResponse>(courseQuery)).response
  }
}
