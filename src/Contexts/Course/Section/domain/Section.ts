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

export class Section extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly courseId: CourseId,
        readonly title: Title,
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
    title: Title
  ): Section {
    const section = new Section(
      id,
      courseId,
      title,
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
    title: Title
  ): Section {
    const course = new Section(
      id,
      this.courseId,
      title,
      this.totalLessons,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    course.record(SectionUpdatedDomainEvent.fromAggregate(course))

    return course
  }
}
