import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Ticket } from '../Ticket'
import { Nullable } from '@Shared/domain/Nullable'

type TicketUpdatedDomainEventBody = {
    readonly id: string
    readonly eventId: string
    readonly title: string
    readonly description: Nullable<string>
    readonly communityId: string
    readonly price: {value: number, currency: string}
    readonly isOnline: boolean
    readonly isOnSite: boolean
}

export class TicketUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.events.ticket.v1.updated'

  readonly id: string
  readonly eventId: string
  readonly title: string
  readonly description: Nullable<string>
  readonly communityId: string
  readonly price: {value: number, currency: string}
  readonly isOnline: boolean
  readonly isOnSite: boolean

  static {
    DomainEvent.derived.add(TicketUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: TicketUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(TicketUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.eventId = params.eventId
    this.title = params.title
    this.description = params.description
    this.price = params.price
    this.communityId = params.communityId
    this.isOnSite = params.isOnSite
    this.isOnline = params.isOnline
  }

  static fromAggregate (ticket: Ticket): TicketUpdatedDomainEvent {
    return new TicketUpdatedDomainEvent({
      id: ticket.id.valueOf(),
      eventId: ticket.eventId.valueOf(),
      title: ticket.title.valueOf(),
      description: ticket.description?.valueOf(),
      price: {
        value: ticket.price.value.valueOf(),
        currency: ticket.price.currency.valueOf()
      },
      isOnline: ticket.isOnline.valueOf(),
      isOnSite: ticket.isOnSite.valueOf(),
      communityId: ticket.communityId.valueOf()

    })
  }

  toPrimitive (): TicketUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: TicketUpdatedDomainEventBody, eventId: string, occurredOn: Date): TicketUpdatedDomainEvent {
    return new TicketUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
