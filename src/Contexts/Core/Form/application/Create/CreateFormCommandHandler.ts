import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateFormCommand } from './CreateFormCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'
import { CreatedBy } from '@Core/Form/domain/ValueObjects/CreatedBy'

export class CreateFormCommandHandler implements CommandHandler<CreateFormCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateFormCommand
  }

  async handle (command: CreateFormCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id),
      name: new Name(command.name),
      content: FormContents.fromPrimitives(command.content as any),
      isActive: new IsActive(command.isActive),
      createdBy: new CreatedBy(command.createdBy),
      communityId: new CommunityId(command.communityId)
    })
  }
}
