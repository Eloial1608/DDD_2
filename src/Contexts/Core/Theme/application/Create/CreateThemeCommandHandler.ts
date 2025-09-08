import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateThemeCommand } from './CreateThemeCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'
import { PreviewPicUrl } from '@Core/Theme/domain/ValueObjects/PreviewPicUrl'
import { Name } from '@Core/Theme/domain/ValueObjects/Name'
import { Colors } from '@Core/Theme/domain/ValueObjects/Colors'
import { Typography } from '@Core/Theme/domain/ValueObjects/Typography'
import { Components } from '@Core/Theme/domain/ValueObjects/Components'
import { Layout, LayoutSection } from '@Core/Theme/domain/ValueObjects/Layout'

export class CreateThemeCommandHandler implements CommandHandler<CreateThemeCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateThemeCommand
  }

  async handle (command: CreateThemeCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      command.communityId ? new CommunityId(command.communityId) : null,
      new Name(command.name),
      new PreviewPicUrl(command.previewPicUrl),
      new Colors(command.colors),
      new Typography(command.typography),
      command.components ? new Components(command.components) : null,
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
