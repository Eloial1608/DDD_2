import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Ticket } from '../Ticket'
import { Nullable } from '@Shared/domain/Nullable'

type TicketCreatedDomainEventBody = {
    readonly id: string
    readonly eventId: string
    readonly title: string
    readonly description: Nullable<string>
    readonly price: {value: number, currency: string}
    readonly isOnline: boolean
    readonly isOnSite: boolean
}

export class TicketCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.ticket.v1.created'

  readonly id: string
  readonly eventId: string
  readonly title: string
  readonly description: Nullable<string>
  readonly price: {value: number, currency: string}
  readonly isOnline: boolean
  readonly isOnSite: boolean

  static {
    DomainEvent.derived.add(TicketCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TicketCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TicketCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.eventId = params.eventId
    this.title = params.title
    this.description = params.description
    this.price = params.price
    this.isOnSite = params.isOnSite
    this.isOnline = params.isOnline
  }

  static fromAggregate (ticket: Ticket): TicketCreatedDomainEvent {
    return new TicketCreatedDomainEvent({
      id: ticket.id.valueOf(),
      eventId: ticket.eventId.valueOf(),
      title: ticket.title.valueOf(),
      description: ticket.description?.valueOf(),
      price: {
        value: ticket.price.value.valueOf(),
        currency: ticket.price.currency.valueOf()
      },
      isOnline: ticket.isOnline.valueOf(),
      isOnSite: ticket.isOnSite.valueOf()
    })
  }

  toPrimitive (): TicketCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TicketCreatedDomainEventBody, eventId: string, occurredOn: Date): TicketCreatedDomainEvent {
    return new TicketCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
