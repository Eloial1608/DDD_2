import { Like } from '@Media/Like/domain/Like'
import { CreatedAt } from '@Media/Like/domain/ValueObjects/CreatedAt'
import { MediaId } from '@Media/Like/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Like/domain/ValueObjects/UserId'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class LikeMother {
  static create (params: Partial<Like>): Like {
    return new Like(
      params.id ?? new Id(UuidMother.random()),
      params.mediaId ?? new MediaId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): Like {
    return this.create({})
  }
}
