import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { UserId } from './ValueObjects/UserId'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Author } from './ValueObjects/Author'
import { CourseId } from './ValueObjects/CourseId'
import { CommentUpdatedDomainEvent } from './Events/CommentUpdatedDomainEvent'

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

  update (
    content: Content
  ) {
    const comment = new Comment(
      this.id,
      this.courseId,
      this.userId,
      this.author,
      content,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    comment.record(CommentUpdatedDomainEvent.fromAggregate(comment))

    return comment
  }
}
