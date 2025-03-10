import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SectionNotFound } from '@Course/Section/domain/Errors/SectionNotFound'
import { NotAllowedToPersistSection } from '@Course/Section/domain/Errors/NotAllowedToPersistSection'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'

export class Updater {
  constructor (private readonly repository: SectionRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    courseId: CourseId,
    title: Title
  ) {
    const section = await this.repository.find(id)

    if (!section) throw new SectionNotFound(id)

    if (section.courseId.valueOf() !== courseId.valueOf()) throw new NotAllowedToPersistSection(section.id)

    const course = await this.findCourseById(courseId)

    if (!course) throw new NotAllowedToPersistSection(section.id)

    const updatedSection = section.update(
      id,
      title
    )

    await this.repository.persist(updatedSection)
    await this.eventBus.publish(updatedSection.pullDomainEvents())
  }

  private async findCourseById (id: CourseId) {
    const courseQuery = new FindCourseByIdQuery(id.valueOf())

    return (await this.queryBus.ask<CourseResponse>(courseQuery)).response
  }
}
