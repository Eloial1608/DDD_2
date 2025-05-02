import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SectionId } from './ValueObjects/SectionId'
import { Title } from './ValueObjects/Title'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { LessonDeletedDomainEvent } from './Events/LessonDeletedDomainEvent'
import { LessonUpdatedDomainEvent } from './Events/LessonUpdatedDomainEvent'
import { LessonCreatedDomainEvent } from './Events/LessonCreatedDomainEvent'

export class Lesson extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly sectionId: SectionId,
    readonly title: Title,
    readonly content: Content,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    sectionId: SectionId,
    title: Title,
    content: Content
  ): Lesson {
    const lesson = new Lesson(
      id,
      sectionId,
      title,
      content,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    lesson.record(LessonCreatedDomainEvent.fromAggregate(lesson))

    return lesson
  }

  update (
    id: Id,
    title: Title,
    content: Content
  ): Lesson {
    const lesson = new Lesson(
      id,
      this.sectionId,
      title,
      content,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    lesson.record(LessonUpdatedDomainEvent.fromAggregate(lesson))

    return lesson
  }

  delete (): Lesson {
    const lesson = new Lesson(
      this.id,
      this.sectionId,
      this.title,
      this.content,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    lesson.record(LessonDeletedDomainEvent.fromAggregate(lesson))

    return lesson
  }
}
