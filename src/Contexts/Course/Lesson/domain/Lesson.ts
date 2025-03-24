import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SectionId } from './ValueObjects/SectionId'
import { Title } from './ValueObjects/Title'
import { Type } from './ValueObjects/Type'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { LessonUpdatedDomainEvent } from './Events/LessonUpdatedDomainEvent'
import { LessonDeletedDomainEvent } from './Events/LessonDeletedDomainEvent'
import { LessonCreatedDomainEvent } from './Events/LessonCreatedDomainEvent'

export class Lesson extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly sectionId: SectionId,
    readonly title: Title,
    readonly type: Type,
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
    type: Type,
    content: Content
  ): Lesson {
    const lesson = new Lesson(
      id,
      sectionId,
      title,
      type,
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
    type: Type,
    content: Content
  ): Lesson {
    const lesson = new Lesson(
      id,
      this.sectionId,
      title,
      type,
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
      this.type,
      this.content,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    lesson.record(LessonDeletedDomainEvent.fromAggregate(lesson))

    return lesson
  }
}
