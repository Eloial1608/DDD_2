import { Post } from '@Posts/Post/domain/Post'
import { Author } from '@Posts/Post/domain/ValueObjects/Author'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Post/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { TotalComments } from '@Posts/Post/domain/ValueObjects/TotalComments'
import { TotalLikes } from '@Posts/Post/domain/ValueObjects/TotalLikes'
import { UpdatedAt } from '@Posts/Post/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { User } from '@Posts/User/domain/User'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class PostMother {
  static create (params: Partial<Post>): Post {
    return new Post(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.content ?? new Content(WordMother.random()),
      params.bannerUrl ?? null,
      params.author ?? new Author(
        UuidMother.random(),
        UuidMother.random(),
        WordMother.random(),
        SlugMother.random(),
        null,
        null
      ),
      params.isPaid ?? new IsPaid(false),
      params.price ?? null,
      params.totalLikes ?? new TotalLikes(0),
      params.totalComments ?? new TotalComments(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Post {
    return this.create({})
  }

  static forAuthor (user: User): Post {
    return this.create({
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
