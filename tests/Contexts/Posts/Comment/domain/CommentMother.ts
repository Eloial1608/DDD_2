import { Comment } from '@Posts/Comment/domain/Comment'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UpdatedAt } from '@Posts/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { UserMetadata } from '@Posts/Comment/domain/ValueObjects/UserMetadata'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CommentMother {
  static create (params: Partial<Comment>): Comment {
    return new Comment(
      params.id ?? new Id(UuidMother.random()),
      params.postId ?? new PostId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.userMetadata ?? new UserMetadata(WordMother.random()),
      params.content ?? new Content(WordMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): Comment {
    return this.create({})
  }
}
