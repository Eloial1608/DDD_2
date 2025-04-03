import { Command } from '@Shared/domain/CommandBus/Command'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateTicketCommand } from './UpdateTicketCommand'
import { Updater } from './Updater'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { Description } from '@Events/Ticket/domain/ValueObjects/Description'
import { Price, PriceCurrency, PriceValue } from '@Events/Ticket/domain/ValueObjects/Price'

export class UpdateTicketCommandHandler implements CommandHandler<UpdateTicketCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateTicketCommand
  }

  async handle (command: UpdateTicketCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id.valueOf()),
      title: new Title(command.title),
      description: command.description ? new Description(command.description) : null,
      price: new Price(
        new PriceValue(command.price.value),
        new PriceCurrency(command.price.currency)
      )
    })
  }
}
