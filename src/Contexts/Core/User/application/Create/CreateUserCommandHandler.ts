import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateUserCommand } from './CreateUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Core/User/domain/ValueObjects/IsOwner'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserCommand
  }

  async handle (command: CreateUserCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new MainId(command.mainId),
      new Name(command.name),
      new Email(command.email),
      new CommunityId(command.communityId),
      new IsAdmin(command.isAdmin),
      new IsOwner(command.isOwner)
    )
  }
}
