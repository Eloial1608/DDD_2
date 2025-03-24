import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { UserId } from './ValueObjects/UserId'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Author } from './ValueObjects/Author'
import { CourseId } from './ValueObjects/CourseId'
import { CommentCreatedDomainEvent } from './Events/CommentCreatedDomainEvent'

export class Comment extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly courseId: CourseId,
    readonly userId: UserId,
    readonly author: Author,
    readonly content: Content,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    courseId: CourseId,
    userId: UserId,
    author: Author,
    content: Content
  ): Comment {
    const comment = new Comment(
      id,
      courseId,
      userId,
      author,
      content,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    comment.record(CommentCreatedDomainEvent.fromAggregate(comment))

    return comment
  }
}
