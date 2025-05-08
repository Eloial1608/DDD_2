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
import { Order } from './ValueObjects/Order'
import { LessonOrderUpdatedDomainEvent } from './Events/LessonOrderUpdatedDomainEvent'

export class Lesson extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly sectionId: SectionId,
    readonly title: Title,
    readonly content: Content,
    readonly order: Order,
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
    content: Content,
    order: Order
  ): Lesson {
    const lesson = new Lesson(
      id,
      sectionId,
      title,
      content,
      order,
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
    content: Content,
    order: Order
  ): Lesson {
    const lesson = new Lesson(
      id,
      this.sectionId,
      title,
      content,
      order,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    lesson.record(LessonUpdatedDomainEvent.fromAggregate(lesson))

    return lesson
  }

  updateOrder (
    order: Order
  ): Lesson {
    const lesson = new Lesson(
      this.id,
      this.sectionId,
      this.title,
      this.content,
      order,
      this.createdAt,
      this.updatedAt,
      null
    )

    lesson.record(LessonOrderUpdatedDomainEvent.fromAggregate(lesson))

    return lesson
  }

  delete (): Lesson {
    const lesson = new Lesson(
      this.id,
      this.sectionId,
      this.title,
      this.content,
      this.order,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    lesson.record(LessonDeletedDomainEvent.fromAggregate(lesson))

    return lesson
  }
}
