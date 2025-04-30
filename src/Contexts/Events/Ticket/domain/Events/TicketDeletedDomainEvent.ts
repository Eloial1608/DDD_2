import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Ticket } from '../Ticket'
import { Nullable } from '@Shared/domain/Nullable'

type TicketDeletedDomainEventBody = {
    readonly id: string
    readonly eventId: string
    readonly title: string
    readonly description: Nullable<string>
    readonly price: {value: number, currency: string}
    readonly isOnline: boolean
    readonly isOnSite: boolean
}

export class TicketDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.ticket.v1.deleted'

  readonly id: string
  readonly eventId: string
  readonly title: string
  readonly description: Nullable<string>
  readonly price: {value: number, currency: string}
  readonly isOnline: boolean
  readonly isOnSite: boolean

  static {
    DomainEvent.derived.add(TicketDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: TicketDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TicketDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.eventId = params.eventId
    this.title = params.title
    this.description = params.description
    this.price = params.price
    this.isOnSite = params.isOnSite
    this.isOnline = params.isOnline
  }

  static fromAggregate (ticket: Ticket): TicketDeletedDomainEvent {
    return new TicketDeletedDomainEvent({
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

  toPrimitive (): TicketDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TicketDeletedDomainEventBody, eventId: string, occurredOn: Date): TicketDeletedDomainEvent {
    return new TicketDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
