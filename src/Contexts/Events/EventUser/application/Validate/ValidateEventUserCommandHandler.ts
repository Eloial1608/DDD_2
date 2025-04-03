import { Command } from '@Shared/domain/CommandBus/Command'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { ValidateEventUserCommand } from './ValidateEventUserCommand'
import { Validator } from './Validator'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'

export class ValidateEventUserCommandHandler implements CommandHandler<ValidateEventUserCommand> {
  constructor (private readonly validator: Validator) {}

  subscribedTo (): Command {
    return ValidateEventUserCommand
  }

  async handle (command: ValidateEventUserCommand): Promise<void> {
    await this.validator.run(
      new Id(command.id)
    )
  }
}
