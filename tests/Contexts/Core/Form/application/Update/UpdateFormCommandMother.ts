import { UpdateFormCommand } from '@Core/Form/application/Update/UpdateFormCommand'
import { Form } from '@Core/Form/domain/Form'

export class UpdateFormCommandMother {
  static create (
    id: string,
    name: string,
    content: object[],
    isActive: boolean,
    communityId: string
  ): UpdateFormCommand {
    return new UpdateFormCommand(
      id,
      name,
      content,
      isActive,
      communityId
    )
  }

  static fromAggregate (form: Form): UpdateFormCommand {
    return this.create(
      form.id.valueOf(),
      form.name.valueOf(),
      form.content.toPrimitives(),
      form.isActive.valueOf(),
      form.communityId.valueOf()
    )
  }
}
