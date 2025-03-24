import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { UserId } from './ValueObjects/UserId'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Author } from './ValueObjects/Author'
import { CourseId } from './ValueObjects/CourseId'
import { CommentDeletedDomainEvent } from './Events/CommentDeletedDomainEvent'

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

  delete () {
    const comment = new Comment(
      this.id,
      this.courseId,
      this.userId,
      this.author,
      this.content,
      this.createdAt,
      this.updatedAt
    )

    comment.record(CommentDeletedDomainEvent.fromAggregate(comment))

    return comment
  }
}
