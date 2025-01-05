import { Media } from '@Media/Media/domain/Media'
import { Author } from '@Media/Media/domain/ValueObjects/Author'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { ContentIds } from '@Media/Media/domain/ValueObjects/ContentIds'
import { CreatedAt } from '@Media/Media/domain/ValueObjects/CreatedAt'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { IsPaid } from '@Media/Media/domain/ValueObjects/IsPaid'
import { SpaceId } from '@Media/Media/domain/ValueObjects/SpaceId'
import { Title } from '@Media/Media/domain/ValueObjects/Title'
import { TotalComments } from '@Media/Media/domain/ValueObjects/TotalComments'
import { TotalLikes } from '@Media/Media/domain/ValueObjects/TotalLikes'
import { UpdatedAt } from '@Media/Media/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { User } from '@Media/User/domain/User'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class MediaMother {
  static create (params: Partial<Media>): Media {
    return new Media(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.contentIds ?? new ContentIds([UuidMother.random()]),
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

  static random (): Media {
    return this.create({})
  }

  static forAuthor (user: User): Media {
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
