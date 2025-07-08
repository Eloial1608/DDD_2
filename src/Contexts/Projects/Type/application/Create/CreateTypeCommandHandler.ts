import { Command } from '@Shared/domain/CommandBus/Command'
import { CreateTypeCommand } from './CreateTypeCommand'
import { Creator } from './Creator'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Id } from '@Projects/Type/domain/ValueObjects/Id'
import { Title } from '@Projects/Type/domain/ValueObjects/Title'
import { Description } from '@Projects/Type/domain/ValueObjects/Description'
import { Color } from '@Projects/Type/domain/ValueObjects/Color'
import { ProjectId } from '@Projects/Type/domain/ValueObjects/ProjectId'
import { CommunityId } from '@Projects/Type/domain/ValueObjects/CommunityId'

export class CreateTypeCommandHandler implements CommandHandler<CreateTypeCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateTypeCommand
  }

  async handle (command: CreateTypeCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      new Color(command.color),
      command.projectId ? new ProjectId(command.projectId) : null,
      new CommunityId(command.communityId)
    )
  }
}
