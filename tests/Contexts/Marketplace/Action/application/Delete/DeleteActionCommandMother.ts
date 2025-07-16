import { DeleteActionCommand } from '@Marketplace/Action/application/Delete/DeleteActionCommand'
import type { Action } from '@Marketplace/Action/domain/Action'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DeleteActionCommandMother {
  static create (
    id: string
  ): DeleteActionCommand {
    return new DeleteActionCommand(
      id
    )
  }

  static fromAggregate (action: Action): DeleteActionCommand {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return this.create(
      action.id.valueOf()
    )
  }
}
