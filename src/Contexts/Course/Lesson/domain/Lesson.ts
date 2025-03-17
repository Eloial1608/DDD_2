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
import { LessonDeletedDomainEvent } from './events/LessonDeletedDomainEvent'

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
