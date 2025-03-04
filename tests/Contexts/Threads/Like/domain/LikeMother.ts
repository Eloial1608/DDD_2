import { Like } from '@Threads/Like/domain/Like'
import { CreatedAt } from '@Threads/Like/domain/ValueObjects/CreatedAt'
import { ThreadId } from '@Threads/Like/domain/ValueObjects/ThreadId'
import { UserId } from '@Threads/Like/domain/ValueObjects/UserId'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class LikeMother {
  static create (params: Partial<Like>): Like {
    return new Like(
      params.id ?? new Id(UuidMother.random()),
      params.threadId ?? new ThreadId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): Like {
    return this.create({})
  }
}
