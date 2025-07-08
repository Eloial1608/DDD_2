import { CreateTypeCommand } from '@Projects/Type/application/Create/CreateTypeCommand'
import { Type } from '@Projects/Type/domain/Type'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTypeCommandMother {
  static create (
    id: string,
    title: string,
    description: Nullable<string>,
    color: string,
    projectId: Nullable<string>,
    communityId: string
  ): CreateTypeCommand {
    return new CreateTypeCommand(
      id,
      title,
      description,
      color,
      projectId,
      communityId
    )
  }

  static fromAggregate (type: Type): CreateTypeCommand {
    return this.create(
      type.id.valueOf(),
      type.title.valueOf(),
      type.description ? type.description.valueOf() : null,
      type.color.valueOf(),
      type.projectId ? type.projectId.valueOf() : null,
      type.communityId.valueOf()
    )
  }
}
