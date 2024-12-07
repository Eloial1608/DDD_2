import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateUserCommand } from './CreateUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserCommand
  }

  async handle (command: CreateUserCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Name(command.name),
      new Email(command.email),
      new CommunityId(command.communityId)
    )
  }
}
