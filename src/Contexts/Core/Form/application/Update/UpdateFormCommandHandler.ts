import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateFormCommand } from './UpdateFormCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'

export class UpdateFormCommandHandler implements CommandHandler<UpdateFormCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateFormCommand
  }

  async handle (command: UpdateFormCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id),
      name: new Name(command.name),
      content: FormContents.fromPrimitives(command.content as any),
      isActive: new IsActive(command.isActive),
      communityId: new CommunityId(command.communityId)
    })
  }
}
