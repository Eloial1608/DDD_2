import { Like } from '@Posts/Like/domain/Like'
import { CreatedAt } from '@Posts/Like/domain/ValueObjects/CreatedAt'
import { PostId } from '@Posts/Like/domain/ValueObjects/PostId'
import { UserId } from '@Posts/Like/domain/ValueObjects/UserId'
import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class SpaceMother {
  static create (params: Partial<Like>): Like {
    return new Like(
      params.id ?? new Id(UuidMother.random()),
      params.postId ?? new PostId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): Like {
    return this.create({})
  }
}