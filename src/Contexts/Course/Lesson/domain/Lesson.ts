import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SectionId } from './ValueObjects/SectionId'
import { Title } from './ValueObjects/Title'
import { Type } from './ValueObjects/Type'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { LessonUpdatedDomainEvent } from './events/LessonUpdatedDomainEvent'
import { DeletedAt } from './ValueObjects/DeletedAt'

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
}
