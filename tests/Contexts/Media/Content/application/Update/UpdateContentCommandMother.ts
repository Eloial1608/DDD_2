import { UpdateContentCommand } from '@Media/Content/application/Update/UpdateContentCommand'
import { Content } from '@Media/Content/domain/Content'

export class UpdateContentCommandMother {
  static update (
    id: string,
    communityId: string,
    type: string,
    url: string
  ): UpdateContentCommand {
    return new UpdateContentCommand(
      id,
      communityId,
      type,
      url
    )
  }

  static fromAggregate (content: Content): UpdateContentCommand {
    return this.update(
      content.id.valueOf(),
      content.communityId.valueOf(),
      content.type.valueOf(),
      content.url.valueOf()
    )
  }
}
