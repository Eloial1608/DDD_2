import { Comment } from '@Course/Comment/domain/Comment'
import { Content } from '@Course/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Course/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { CourseId } from '@Course/Comment/domain/ValueObjects/CourseId'
import { UpdatedAt } from '@Course/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Course/Comment/domain/ValueObjects/UserId'
import { Author } from '@Course/Comment/domain/ValueObjects/Author'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { User } from '@Course/User/domain/User'

export class CommentMother {
  static create (params: Partial<Comment>): Comment {
    return new Comment(
      params.id ?? new Id(UuidMother.random()),
      params.courseId ?? new CourseId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.author ?? new Author(
        UuidMother.random(),
        UuidMother.random(),
        WordMother.random(),
        SlugMother.random(),
        null,
        null
      ),
      params.content ?? new Content(WordMother.random()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): Comment {
    return this.create({})
  }

  static forAuthor (user: User): Comment {
    return this.create({
      userId: new UserId(user.id.valueOf()),
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })
  }
}
