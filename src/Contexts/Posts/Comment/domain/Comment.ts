import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { PostId } from './ValueObjects/PostId'
import { UserId } from './ValueObjects/UserId'
import { Content } from './ValueObjects/Content'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Author } from './ValueObjects/Author'
import { CommentDeletedDomainEvent } from './Events/CommentDeletedDomainEvent'
import { CommentUpdatedDomainEvent } from './Events/CommentUpdatedDomainEvent'
import { CommentCreatedDomainEvent } from './Events/CommentCreatedDomainEvent'

export class Comment extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly postId: PostId,
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
    postId: PostId,
    userId: UserId,
    author: Author,
    content: Content,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt
  ): Comment {
    const post = new Comment(
      id,
      postId,
      userId,
      author,
      content,
      createdAt,
      updatedAt
    )

    post.record(CommentCreatedDomainEvent.fromAggregate(post))

    return post
  }

  delete () {
    const comment = new Comment(
      this.id,
      this.postId,
      this.userId,
      this.author,
      this.content,
      this.createdAt,
      this.updatedAt
    )

    comment.record(CommentDeletedDomainEvent.fromAggregate(comment))

    return comment
  }

  update (
    content: Content
  ) {
    const comment = new Comment(
      this.id,
      this.postId,
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
