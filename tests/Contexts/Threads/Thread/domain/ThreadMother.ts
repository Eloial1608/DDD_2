import { Thread } from '@Threads/Thread/domain/Thread'
import { Author } from '@Threads/Thread/domain/ValueObjects/Author'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { CreatedAt } from '@Threads/Thread/domain/ValueObjects/CreatedAt'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { TotalThreads } from '@Threads/Thread/domain/ValueObjects/TotalThreads'
import { TotalLikes } from '@Threads/Thread/domain/ValueObjects/TotalLikes'
import { UpdatedAt } from '@Threads/Thread/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { User } from '@Threads/User/domain/User'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class ThreadMother {
  static create (params: Partial<Thread>): Thread {
    return new Thread(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.title ?? new Title(UuidMother.random()),
      params.parentThreadId ?? null,
      params.mainThreadId ?? null,
      params.userId ?? new UserId(UuidMother.random()),
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
      params.totalThreads ?? new TotalThreads(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Thread {
    return this.create({})
  }

  static forAuthor (user: User): Thread {
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
