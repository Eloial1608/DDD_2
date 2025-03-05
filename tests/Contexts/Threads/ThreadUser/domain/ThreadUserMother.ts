import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { CreatedAt } from '@Threads/ThreadUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { ThreadId } from '@Threads/ThreadUser/domain/ValueObjects/ThreadId'
import { UserId } from '@Threads/ThreadUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class ThreadUserMother {
  static create (params: Partial<ThreadUser>): ThreadUser {
    return new ThreadUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.threadId ?? new ThreadId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): ThreadUser {
    return this.create({})
  }
}
