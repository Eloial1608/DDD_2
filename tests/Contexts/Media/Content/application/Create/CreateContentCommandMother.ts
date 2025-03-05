import { CreateContentCommand } from '@Media/Content/application/Create/CreateContentCommand'
import { Content } from '@Media/Content/domain/Content'

export class CreateContentCommandMother {
  static create (
    id: string,
    communityId: string,
    mediaId: string,
    type: string,
    url: string
  ): CreateContentCommand {
    return new CreateContentCommand(
      id,
      communityId,
      mediaId,
      type,
      url
    )
  }

  static fromAggregate (content: Content): CreateContentCommand {
    return this.create(
      content.id.valueOf(),
      content.communityId.valueOf(),
      content.mediaId.valueOf(),
      content.type.valueOf(),
      content.url.valueOf()
    )
  }
}
