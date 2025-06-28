import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteReviewCommand } from './DeleteReviewCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'

export class DeleteReviewCommandHandler implements CommandHandler<DeleteReviewCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteReviewCommand
  }

  async handle (command: DeleteReviewCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
