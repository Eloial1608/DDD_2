import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Section } from '@Course/Section/domain/Section'
import { CourseId } from '@Course/Section/domain/ValueObjects/CourseId'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Title } from '@Course/Section/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { Description } from '@Course/Section/domain/ValueObjects/Description'
import { Nullable } from '@Shared/domain/Nullable'

export class Creator {
  constructor (private readonly reposiotry: SectionRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id:Id,
    courseId: CourseId,
    title: Title,
    description: Nullable<Description>
  ) {
    const existing = await this.reposiotry.find(id)

    if (existing) return

    const course = await this.findCourseById(courseId)

    if (!course) return

    const section = Section.create(
      id,
      courseId,
      title,
      description
    )

    await this.reposiotry.persist(section)
    await this.eventBus.publish(section.pullDomainEvents())
  }

  private async findCourseById (id: CourseId) {
    const spaceQuery = new FindCourseByIdQuery(id.valueOf())

    return (await this.queryBus.ask<CourseResponse>(spaceQuery)).response
  }
}
