import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { CreatedAt } from '@Posts/PostUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { PostId } from '@Posts/PostUser/domain/ValueObjects/PostId'
import { UserId } from '@Posts/PostUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class PostUserMother {
  static create (params: Partial<PostUser>): PostUser {
    return new PostUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.postId ?? new PostId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): PostUser {
    return this.create({})
  }
}
