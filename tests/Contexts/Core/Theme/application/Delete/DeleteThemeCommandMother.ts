import { DeleteThemeCommand } from '@Core/Theme/application/Delete/DeleteThemeCommand'
import { Theme } from '@Core/Theme/domain/Theme'

export class DeleteThemeCommandMother {
  static delete (id: string, communityId: string): DeleteThemeCommand {
    return new DeleteThemeCommand(id, communityId)
  }

  static fromAggregate (theme: Theme): DeleteThemeCommand {
    return this.delete(
      theme.id.valueOf(),
      theme.communityId!.valueOf()
    )
  }
}
