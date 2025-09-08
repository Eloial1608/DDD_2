import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateThemeCommand } from './UpdateThemeCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'
import { Name } from '@Core/Theme/domain/ValueObjects/Name'
import { PreviewPicUrl } from '@Core/Theme/domain/ValueObjects/PreviewPicUrl'
import { Colors } from '@Core/Theme/domain/ValueObjects/Colors'
import { Typography } from '@Core/Theme/domain/ValueObjects/Typography'
import { Layout } from '@Core/Theme/domain/ValueObjects/Layout'
import { LayoutSection } from '../../domain/ValueObjects/Layout'

export class UpdateThemeCommandHandler implements CommandHandler<UpdateThemeCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateThemeCommand
  }

  async handle (command: UpdateThemeCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      command.communityId ? new CommunityId(command.communityId) : null,
      new Name(command.name),
      new PreviewPicUrl(command.previewPicUrl),
      new Colors(command.colors),
      new Typography(command.typography),
      command.colors ? new Colors(command.colors) : null,
      command.layout
        ? new Layout(
          new LayoutSection(command.layout.header),
          new LayoutSection(command.layout.nav),
          new LayoutSection(command.layout.footer),
          new LayoutSection(command.layout.content)
        )
        : null
    )
  }
}
