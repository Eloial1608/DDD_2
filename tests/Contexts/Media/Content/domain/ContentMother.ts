import { Content } from '@Media/Content/domain/Content'
import { CreatedAt } from '@Media/Content/domain/ValueObjects/CreatedAt'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { MediaId } from '@Media/Content/domain/ValueObjects/MediaId'
import { UpdatedAt } from '@Media/Content/domain/ValueObjects/UpdatedAt'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { AllowedMediaTypes, Type } from '@Media/Content/domain/ValueObjects/Type'
import { Url } from '@Media/Content/domain/ValueObjects/Url'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'

export class ContentMother {
  static create (params: Partial<Content>): Content {
    return new Content(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.mediaId ?? new MediaId(UuidMother.random()),
      new Type(AllowedMediaTypes.IMAGE),
      new Url(MotherCreator.random().internet.url()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): Content {
    return this.create({})
  }
}
