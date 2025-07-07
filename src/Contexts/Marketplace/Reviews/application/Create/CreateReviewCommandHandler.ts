import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateReviewCommand } from './CreateReviewCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'
import { UserId } from '@Marketplace/Reviews/domain/ValueObjects/UserId'
import { Content } from '@Marketplace/Reviews/domain/ValueObjects/Content'
import { ProductId } from '@Marketplace/Reviews/domain/ValueObjects/ProductId'
import { Rating } from '@Marketplace/Reviews/domain/ValueObjects/Rating'

export class CreateReviewCommandHandler implements CommandHandler<CreateReviewCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateReviewCommand
  }

  async handle (command: CreateReviewCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new ProductId(command.productId),
      new UserId(command.userId),
      command.content ? new Content(command.content) : null,
      new Rating(command.rating)
    )
  }
}
