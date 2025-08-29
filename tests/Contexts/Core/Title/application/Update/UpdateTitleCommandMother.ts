import { UpdateTitleCommand } from '@Core/Title/application/Update/UpdateTitleCommand'
import { Title } from '@Core/Title/domain/Title'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateTitleCommandMother {
  static update (
    id: string,
    name: string,
    communityId: string,
    titleImageUrl: Nullable<string>
  ): UpdateTitleCommand {
    return new UpdateTitleCommand(
      id,
      name,
      communityId,
      titleImageUrl
    )
  }

  static fromAggregate (title: Title): UpdateTitleCommand {
    return this.update(
      title.id.valueOf(),
      title.name.valueOf(),
      title.communityId.valueOf(),
      title.titleImageUrl ? title.titleImageUrl.valueOf() : null
    )
  }
}
