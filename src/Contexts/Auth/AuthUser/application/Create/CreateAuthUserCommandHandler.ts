import { Command } from '@Shared/domain/CommandBus/Command'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateAuthUserCommand } from './CreateAuthUserCommand'
import { Creator } from './Creator'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { Method, ValidMethods } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { UserId } from '@Auth/AuthUser/domain/ValueObjects/UserId'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'

export class CreateAuthUserCommandHandler implements CommandHandler<CreateAuthUserCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return [CreateAuthUserCommand]
  }

  async handle (command: CreateAuthUserCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Email(command.email),
      new Method(command.method as ValidMethods),
      new Secret(command.secret),
      new UserId(command.userId),
      new CommunityId(command.communityId)
    )
  }
}
