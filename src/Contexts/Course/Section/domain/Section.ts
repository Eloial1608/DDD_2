import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CourseId } from './ValueObjects/CourseId'
import { Title } from './ValueObjects/Title'
import { TotalLessons } from './ValueObjects/TotalLessons'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { SectionCreatedDomainEvent } from './events/SectionCreatedDomainEvent'
import { SectionUpdatedDomainEvent } from './events/SectionUpdatedDomainEvent'
import { SectionDeletedDomainEvent } from './events/SectionDeletedDomainEvent'
import { SectionTotalLessonsUpdatedDomainEvent } from './events/SectionTotalLessonsUpdatedDomainEvent'
import { Description } from './ValueObjects/Description'

export class Section extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly courseId: CourseId,
        readonly title: Title,
        readonly description: Nullable<Description>,
        readonly totalLessons: TotalLessons,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>

  ) {
    super()
  }

  static create (
    id: Id,
    courseId: CourseId,
    title: Title,
    description: Nullable<Description>
  ): Section {
    const section = new Section(
      id,
      courseId,
      title,
      description,
      new TotalLessons(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    section.record(SectionCreatedDomainEvent.fromAggregate(section))

    return section
  }

  update (
    id: Id,
    title: Title,
    description: Nullable<Description>
  ): Section {
    const section = new Section(
      id,
      this.courseId,
      title,
      description,
      this.totalLessons,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    section.record(SectionUpdatedDomainEvent.fromAggregate(section))

    return section
  }

  delete (): Section {
    const section = new Section(
      this.id,
      this.courseId,
      this.title,
      this.description,
      this.totalLessons,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    section.record(SectionDeletedDomainEvent.fromAggregate(section))

    return section
  }

  updateTotalLessons (
    totalLessons: TotalLessons
  ): Section {
    const section = new Section(
      this.id,
      this.courseId,
      this.title,
      this.description,
      totalLessons,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    section.record(SectionTotalLessonsUpdatedDomainEvent.fromAggregate(section))

    return section
  }
}
