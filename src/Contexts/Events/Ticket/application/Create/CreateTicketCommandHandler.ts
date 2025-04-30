import { Command } from '@Shared/domain/CommandBus/Command'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateTicketCommand } from './CreateTicketCommand'
import { Creator } from './Creator'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { EventId } from '@Events/Ticket/domain/ValueObjects/EventId'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { Description } from '@Events/Ticket/domain/ValueObjects/Description'
import { Price, PriceCurrency, PriceValue } from '@Events/Ticket/domain/ValueObjects/Price'
import { IsOnline } from '@Events/Ticket/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/Ticket/domain/ValueObjects/IsOnSite'

export class CreateTicketCommandHandler implements CommandHandler<CreateTicketCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateTicketCommand
  }

  async handle (command: CreateTicketCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id.valueOf()),
      eventId: new EventId(command.eventId),
      title: new Title(command.title),
      description: command.description ? new Description(command.description) : null,
      price: new Price(
        new PriceValue(command.price.value),
        new PriceCurrency(command.price.currency)
      ),
      isOnline: new IsOnline(command.isOnline),
      isOnSite: new IsOnSite(command.isOnSite)
    })
  }
}
