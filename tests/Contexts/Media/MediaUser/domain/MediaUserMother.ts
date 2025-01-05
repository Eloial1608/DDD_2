import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { CreatedAt } from '@Media/MediaUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { MediaId } from '@Media/MediaUser/domain/ValueObjects/MediaId'
import { UserId } from '@Media/MediaUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class MediaUserMother {
  static create (params: Partial<MediaUser>): MediaUser {
    return new MediaUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.mediaId ?? new MediaId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): MediaUser {
    return this.create({})
  }
}
