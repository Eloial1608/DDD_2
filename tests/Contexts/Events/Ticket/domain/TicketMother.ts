import { Ticket } from '@Events/Ticket/domain/Ticket'
import { CreatedAt } from '@Events/Ticket/domain/ValueObjects/CreatedAt'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { EventId } from '@Events/Ticket/domain/ValueObjects/EventId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'
import { Price, PriceCurrency, PriceValue } from '@Events/Ticket/domain/ValueObjects/Price'
import { IsOnline } from '@Events/Ticket/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/Ticket/domain/ValueObjects/IsOnSite'
import { UpdatedAt } from '@Events/Ticket/domain/ValueObjects/UpdatedAt'

export class TicketMother {
  static create (params: Partial<Ticket>): Ticket {
    return new Ticket(
      params.id ?? new Id(UuidMother.random()),
      params.eventId ?? new EventId(UuidMother.random()),
      params.title ?? new Title(WordMother.random()),
      params.description ?? null,
      params.price ?? new Price(
        new PriceValue(100),
        new PriceCurrency('EUR')
      ),
      params.isOnline ?? new IsOnline(true),
      params.isOnSite ?? new IsOnSite(false),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Ticket {
    return this.create({})
  }
}
