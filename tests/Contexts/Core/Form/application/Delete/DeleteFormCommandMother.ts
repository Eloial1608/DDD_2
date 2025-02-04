import { DeleteFormCommand } from '@Core/Form/application/Delete/DeleteFormCommand'
import { Form } from '@Core/Form/domain/Form'

export class DeleteFormCommandMother {
  static delete (id: string, communityId: string): DeleteFormCommand {
    return new DeleteFormCommand(id, communityId)
  }

  static fromAggregate (form: Form): DeleteFormCommand {
    return this.delete(
      form.id.valueOf(),
      form.communityId.valueOf()
    )
  }
}
