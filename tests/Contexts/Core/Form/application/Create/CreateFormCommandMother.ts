import { CreateFormCommand } from '@Core/Form/application/Create/CreateFormCommand'
import { Form } from '@Core/Form/domain/Form'

export class CreateFormCommandMother {
  static create (
    id: string,
    name: string,
    content: object[],
    isActive: boolean,
    communityId: string,
    createdBy: string
  ): CreateFormCommand {
    return new CreateFormCommand(
      id,
      name,
      content,
      isActive,
      communityId,
      createdBy
    )
  }

  static fromAggregate (form: Form): CreateFormCommand {
    return this.create(
      form.id.valueOf(),
      form.name.valueOf(),
      form.content.toPrimitives(),
      form.isActive.valueOf(),
      form.communityId.valueOf(),
      form.createdBy.valueOf()
    )
  }
}
