import { CreateTitleCommand } from '@Core/Title/application/Create/CreateTitleCommand'
import { Title } from '@Core/Title/domain/Title'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTitleCommandMother {
  static create (
    id: string,
    name: string,
    communityId: string,
    titleImageUrl: Nullable<string>
  ): CreateTitleCommand {
    return new CreateTitleCommand(
      id,
      name,
      communityId,
      titleImageUrl
    )
  }

  static fromAggregate (title: Title): CreateTitleCommand {
    return this.create(
      title.id.valueOf(),
      title.name.valueOf(),
      title.communityId.valueOf(),
      title.titleImageUrl ? title.titleImageUrl.valueOf() : null
    )
  }
}
